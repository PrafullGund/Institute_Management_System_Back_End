const express = require('express');
const router = express.Router();
const userTypeController = require('../userType/userTypeController');

router.post('/userType', userTypeController.postUserTypeController);
router.get('/userType', userTypeController.getAllUserTypeController);
router.get('/userType/:id', userTypeController.getUserTypeIdController);
router.put('/userType/:id', userTypeController.updateUserTypeController);
router.delete('/userType/:id', userTypeController.deleteUserTypeController)

module.exports = router;