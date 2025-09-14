const dbConnection = require('../config/connection');

const postUserService = async (userData) => {

    const dob = userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : null;
    const query = `INSERT INTO user (firstName, lastName, dob, userTypeId) VALUES (?, ?, ?, ?)`;

    // const dob = new Date(userData.dob); 

    const [result] = await dbConnection.query(query, [
        userData.firstName,
        userData.lastName,
        dob,
        userData.userTypeId
    ]);

    return result;
};

const getAllUserService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM user');
    return result;
}

const getUserByIdService = async (userId) => {
    const [result] = await dbConnection.query('SELECT * FROM user WHERE id=?', [userId]);
    return result;
}

const updateUserService = async (userId, userData) => {
    const dob = new Date(userData.dob);

    const user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        dob,
        userTypeId: userData.userTypeId
    };

    const [result] = await dbConnection.query(
        'UPDATE user SET ? WHERE id=?',
        [user, userId]
    )
    return result;
}

const deleteUserService = async (userId) => {
    const [result] = await dbConnection.query('DELETE FROM user WHERE id=?', [userId]);
    return result;
}

const getUserByEmail = async (email) => {
    const query = `
        SELECT 
            u.id as userId,
            u.firstName,
            u.lastName,
            u.dob,
            u.userTypeId,
            uc.password,
            uc.email,
            r.name AS role
        FROM user u
        JOIN usercredentials uc ON u.id = uc.userId
        LEFT JOIN userRoleMapper urm ON u.id = urm.userId
        LEFT JOIN roles r ON urm.roleId = r.id
        WHERE uc.email = ?
        LIMIT 1;
    `;
    const [rows] = await dbConnection.query(query, [email]);
    return rows[0];
};

async function getUserFeatures(userId) {
    const query = `SELECT DISTINCT f.name FROM featureRoleMapping fr JOIN features f ON fr.featureId=f.id JOIN userRoleMapper urm ON fr.roleId=urm.roleId WHERE urm.userId=?`;
    const [uniqueFeatureKeys] = await dbConnection.query(query, [userId]);
    return uniqueFeatureKeys.map((row) => row.name);
}

const addUserService = async (userPayload, credentialsPayload, addressPayload, educationPayload) => {
    const connection = await dbConnection.getConnection();

    try {
        await connection.beginTransaction();

        const [userResult] = await connection.query(
            `INSERT INTO user (firstName, lastName, dob, userTypeId) VALUES (?, ?, ?, ?)`,
            [userPayload.firstName, userPayload.lastName, userPayload.dob, userPayload.userTypeId]
        );
        const userId = userResult.insertId;

        await connection.query(
            `INSERT INTO userCredentials (userId, email, mobile, password) VALUES (?, ?, ?, ?)`,
            [userId, credentialsPayload.email, credentialsPayload.mobile, credentialsPayload.password]
        );

        await connection.query(
            `INSERT INTO userAddresses (userId, addressLineOne, addressLineTwo, country, state, city, postalCode) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                addressPayload.addressLineOne,
                addressPayload.addressLineTwo,
                addressPayload.country,
                addressPayload.state,
                addressPayload.city,
                addressPayload.postalCode
            ]
        );

        await connection.query(
            `INSERT INTO userEducationDetails (userId, educationTitle, description, passingYear) VALUES (?, ?, ?, ?)`,
            [userId, educationPayload.educationTitle, educationPayload.description, educationPayload.passingYear]
        );

        await connection.commit();
        return { userId };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const getAllRegisterUsersService = async () => {
    const connection = await dbConnection.getConnection();
    try {
        const [rows] = await connection.query(`
            SELECT u.id AS userId, u.firstName, u.lastName, u.dob, u.userTypeId,
                   c.email, c.mobile,
                   a.addressLineOne, a.addressLineTwo, a.country, a.state, a.city, a.postalCode,
                   e.educationTitle, e.description AS educationDescription, e.passingYear
            FROM user u
            LEFT JOIN userCredentials c ON u.id = c.userId
            LEFT JOIN userAddresses a ON u.id = a.userId
            LEFT JOIN userEducationDetails e ON u.id = e.userId
            ORDER BY u.id DESC
        `);

        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const getRegisterUserByIdService = async (userId) => {
    const connection = await dbConnection.getConnection();
    try {
        const [rows] = await connection.query(
            `
            SELECT u.id AS userId, u.firstName, u.lastName, u.dob, u.userTypeId,
                   c.email, c.mobile,
                   a.addressLineOne, a.addressLineTwo, a.country, a.state, a.city, a.postalCode,
                   e.educationTitle, e.description AS educationDescription, e.passingYear
            FROM user u
            LEFT JOIN userCredentials c ON u.id = c.userId
            LEFT JOIN userAddresses a ON u.id = a.userId
            LEFT JOIN userEducationDetails e ON u.id = e.userId
            WHERE u.id = ?
            `,
            [userId]
        );

        return rows.length ? rows[0] : null;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const updateRegisterUserService = async (userId, userPayload, credentialsPayload, addressPayload, educationPayload) => {
    const connection = await dbConnection.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query(
            `UPDATE user SET firstName=?, lastName=?, dob=?, userTypeId=? WHERE id=?`,
            [userPayload.firstName, userPayload.lastName, userPayload.dob, userPayload.userTypeId, userId]
        );

        await connection.query(
            `UPDATE userCredentials SET email=?, mobile=?, password=? WHERE userId=?`,
            [credentialsPayload.email, credentialsPayload.mobile, credentialsPayload.password, userId]
        );

        await connection.query(
            `UPDATE userAddresses SET addressLineOne=?, addressLineTwo=?, country=?, state=?, city=?, postalCode=? WHERE userId=?`,
            [
                addressPayload.addressLineOne,
                addressPayload.addressLineTwo,
                addressPayload.country,
                addressPayload.state,
                addressPayload.city,
                addressPayload.postalCode,
                userId
            ]
        );

        await connection.query(
            `UPDATE userEducationDetails SET educationTitle=?, description=?, passingYear=? WHERE userId=?`,
            [educationPayload.educationTitle, educationPayload.description, educationPayload.passingYear, userId]
        );

        await connection.commit();
        return { userId };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const deleteRegisterUserService = async (userId) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        await connection.query(`DELETE FROM userEducationDetails WHERE userId=?`, [userId]);
        await connection.query(`DELETE FROM userAddresses WHERE userId=?`, [userId]);
        await connection.query(`DELETE FROM userCredentials WHERE userId=?`, [userId]);
        await connection.query(`DELETE FROM user WHERE id=?`, [userId]);

        await connection.commit();
        return { userId };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const searchRegisterUsersService = async (searchTerm) => {
    const connection = await dbConnection.getConnection();

    try {
        const likeQuery = `%${searchTerm}%`;
        const [rows] = await connection.query(`
            SELECT u.id AS userId, u.firstName, u.lastName,
                    c.email, c.mobile,
                     CONCAT(a.addressLineOne, ' ', IFNULL(a.addressLineTwo,'')) AS address,
                   e.educationTitle
            FROM user u
            LEFT JOIN userCredentials c ON u.id=c.userId
            LEFT JOIN userAddresses a ON u.id=a.userId
            LEFT JOIN userEducationDetails e ON u.id=e.userId
            WHERE u.firstName LIKE ?
                 OR u.lastName LIKE ?
               OR c.email LIKE ?
               OR c.mobile LIKE ?
               OR a.addressLineOne LIKE ?
               OR a.addressLineTwo LIKE ?
               OR e.educationTitle LIKE ?
            ORDER BY u.id DESC
                   `, [likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    postUserService,
    getAllUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    getUserByEmail,
    getUserFeatures,
    addUserService,
    getAllRegisterUsersService,
    getRegisterUserByIdService,
    updateRegisterUserService,
    deleteRegisterUserService,
    searchRegisterUsersService
};
