const userTypeService = require('../userType/userTypeService');

const postUserTypeController = (req, res) => {
    const userTypeData = req.body;
    userTypeService.postUserTypeService(userTypeData, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        res.status(200).json({ success: "UserType Added Successfully" });
    });
};

const getAllUserTypeController = (req, res) => {
    userTypeService.getAllUserTypeService((error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        res.status(200).json({ success: true, data: result });
    });
}

const getUserTypeIdController = (req, res) => {
    const userTypeId = req.params.id;
    userTypeService.getUserTypeByIdService(userTypeId, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            if (result.length === 0) {
                res.status(404).json({ success: false, message: 'User Type Not Found' })
            } else {
                res.status(200).json({ success: true, data: result[0] })
            }
        }
    })
}

const updateUserTypeController = (req, res) => {
    const userTypeId = req.params.id;
    const userData = req.body;

    userTypeService.updateUserTypeService(userTypeId, userData, (error, result) => {
        if (error) {
            res.status(500).json({ sucess: false, message: error.message });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: true, message: 'User Type Update Successfully' });
            } else {
                res.status(404).json({ sucess: false, message: 'User Type not found' })
            }
        }
    })
}

const deleteUserTypeController = (req, res) => {
    const userTypeId = req.params.id;
    userTypeService.deleteUserTypeService(userTypeId, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: true, message: 'User Type Delete Successfully' });
            } else {
                res.status(404).json({ success: false, message: 'User Type Not Found' })
            }
        }
    })
}

module.exports = {
    postUserTypeController,
    getAllUserTypeController,
    getUserTypeIdController,
    updateUserTypeController,
    deleteUserTypeController
}