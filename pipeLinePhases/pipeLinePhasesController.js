const pipeLinePhasesService = require('./pipeLinePhasesService');

const postPipeLinePhasesController = async (req, res) => {
    try {
        const result = await pipeLinePhasesService.postPipeLinePhasesService(req.body);
        res.status(201).json({ success: true, message: 'PipeLine Phases Added Successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllPipeLinePhasesController = async (req, res) => {
    try {
        const result = await pipeLinePhasesService.getAllPipeLinePhasesService();
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getByIdPipeLinePhasesController = async (req, res) => {
    try {
        const pipeLinePhasesId = req.params.id;
        const result = await pipeLinePhasesService.getByIdPipeLinePhasesService(pipeLinePhasesId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Pipe Line Phases Not Found' })
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updatePipeLinePhasesController = async (req, res) => {
    try {
        const pipeLinePhasesId = req.params.id;
        const pipeLinePhasesData = req.body;
        const result = await pipeLinePhasesService.updatePipeLinePhasesService(pipeLinePhasesId, pipeLinePhasesData);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Pipe Line Phases Updated Successfully' })
        } else {
            res.status(404).json({ success: false, message: 'Pipe Line Phases Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deletePipeLinePhasesController = async (req, res) => {
    try {
        const pipeLinePhasesId = req.params.id;
        const result = await pipeLinePhasesService.deletePipeLinePhasesService(pipeLinePhasesId);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Pipe Line Phases Deleted Successfully' })
        } else {
            res.status(404).json({ success: false, message: 'Pipe Line Phases Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postPipeLinePhasesController,
    getAllPipeLinePhasesController,
    getByIdPipeLinePhasesController,
    updatePipeLinePhasesController,
    deletePipeLinePhasesController
}