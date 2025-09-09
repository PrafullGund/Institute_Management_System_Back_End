const express=require('express');
const router=express.Router();
const rolesController=require('../roles/rolesController');

router.post('/roles/post',rolesController.postRoleController);
router.get('/roles/getAll',rolesController.getAllRolesController);
router.get('/roles/getById/:id',rolesController.getRolesByIdController);
router.put('/roles/update/:id',rolesController.updateRolesController);
router.delete('/roles/delete/:id',rolesController.deleteRolesController);

module.exports=router;