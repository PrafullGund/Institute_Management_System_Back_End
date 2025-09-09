const express = require('express');
const router = express.Router();
const pipeLinePhasesController = require('./pipeLinePhasesController');

router.post('/pipeLinePhases', pipeLinePhasesController.postPipeLinePhasesController);
router.get('/pipeLinePhases/getAll', pipeLinePhasesController.getAllPipeLinePhasesController);
router.get('/pipeLinePhases/getById/:id', pipeLinePhasesController.getByIdPipeLinePhasesController);
router.put('/pipeLinePhases/update/:id', pipeLinePhasesController.updatePipeLinePhasesController);
router.delete('/pipeLinePhases/:id', pipeLinePhasesController.deletePipeLinePhasesController);

module.exports = router;