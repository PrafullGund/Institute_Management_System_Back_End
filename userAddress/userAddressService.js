const dbConnection = require('../config/connection');

const postUserAddressService = async (userAddressData) => {
    const query = 'INSERT INTO userAddresses (userId,addressLineOne,addressLineTwo,country,state,city,postalCode) VALUES (?,?,?,?,?,?,?)';

    const [result] = await dbConnection.query(query, [
        userAddressData.userId,
        userAddressData.addressLineOne,
        userAddressData.addressLineTwo,
        userAddressData.country,
        userAddressData.state,
        userAddressData.city,
        userAddressData.postalCode
    ]);
    return result;
}

const getAllUserAddressService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM userAddresses');
    return result;
}

const getUserAddressByIdService=async(userAddressId)=>{
    const [result]=await dbConnection.query('SELECT * FROM userAddresses WHERE id=?',[userAddressId]);
    return result;
}

const updateUserAddressService=async (userAddressId,userAddressData)=>{
    const userAddress={
        userId:userAddressData.userId,
        addressLineOne:userAddressData.addressLineOne,
        addressLineTwo:userAddressData.addressLineTwo,
        country:userAddressData.country,
        state:userAddressData.state,
        city:userAddressData.city,
        postalCode:userAddressData.postalCode
    }

    const [result]=await dbConnection.query(
        'UPDATE userAddresses SET ? WHERE id =?',
        [userAddress,userAddressId]
    )
    return result;
}

const deleteUserAddressService=async (userAddressId)=>{
    const [result]=await dbConnection.query('DELETE FROM userAddresses WHERE id=?',[userAddressId]);
    return result;
}


module.exports = {
    postUserAddressService,
    getAllUserAddressService,
    getUserAddressByIdService,
    updateUserAddressService,
    deleteUserAddressService
}

