const userRoleMapperJoi = require('../userRoleMapper/userRoleMapperJoi');
const userRoleMapperService = require('../userRoleMapper/userRoleMapperService');

const postUserRoleMapperController = async (req, res) => {
    try {
        const { error } = userRoleMapperJoi.userRoleMapperJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await userRoleMapperService.postUserRoleMapperService(req.body);
        res.status(200).json({ success: true, message: 'User Role Mapper Added Successfully', data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllUserRoleMapperController = async (req, res) => {
    try {

        const result = await userRoleMapperService.getAllUserRoleMapperService();
        res.status(201).json({ success: true, data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getUserRoleMapperByIdController = async (req, res) => {
    try {

        const userRoleMapperId = req.params.id;
        const result = await userRoleMapperService.getUserRoleMapperByIdService(userRoleMapperId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'User Role Mapper Not Found' });
        } else {
            res.status(201).json({ success: true, data: result[0] })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateUserRoleMapperController = async (req, res) => {
    try {
        const userRoleMapperId = req.params.id;
        const userRoleData = req.body;

        const result = await userRoleMapperService.updateUserRoleMapperService(userRoleMapperId, userRoleData);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'User Role Mapper Update Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User Role Mapper Not Found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteUserRoleMapperController = async (req, res) => {
    try {
        const userRoleMapperId = req.params.id;
        const result = await userRoleMapperService.deleteUserRoleMapperService(userRoleMapperId);
        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'User Role Mapper Delete Successfully' })
        } else {
            res.status(404).json({ success: false, message: 'User Role Mapper Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postUserRoleMapperController,
    getAllUserRoleMapperController,
    getUserRoleMapperByIdController,
    updateUserRoleMapperController,
    deleteUserRoleMapperController
}
