const express = require('express');
const router = express.Router();
const userRoleMapperController = require('../userRoleMapper/userRoleMapperController');

router.post('/userRoleMapper/post', userRoleMapperController.postUserRoleMapperController);
router.get('/userRoleMapper/getAll', userRoleMapperController.getAllUserRoleMapperController);
router.get('/userRoleMapper/getById/:id', userRoleMapperController.getUserRoleMapperByIdController);
router.put('/userRoleMapper/update/:id', userRoleMapperController.updateUserRoleMapperController);
router.delete('/userRoleMapper/delete/:id', userRoleMapperController.deleteUserRoleMapperController);

module.exports = router;