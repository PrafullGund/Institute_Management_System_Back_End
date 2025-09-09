const dbConnection = require('../config/connection');

const postPipeLinePhasesService = async (pipeLinePhasesData) => {
    const query = 'INSERT INTO pipeLinePhases (phaseName) VALUES (?)';
    const [result] = await dbConnection.query(query, [
        pipeLinePhasesData.phaseName
    ]);
    return result;
}

const getAllPipeLinePhasesService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM pipeLinePhases');
    return result;
}

const getByIdPipeLinePhasesService = async (pipeLinePhasesId) => {
    const [result] = await dbConnection.query('SELECT * FROM pipeLinePhases WHERE Id=?', pipeLinePhasesId);
    return result;
}

const updatePipeLinePhasesService = async (pipeLinePhasesId, pipeLinePhasesData) => {
    const pipeLinePhases = {
        phaseName: pipeLinePhasesData.phaseName
    }

    const [result] = await dbConnection.query(
        `UPDATE pipeLinePhases SET ? WHERE Id=?`,
        [pipeLinePhases, pipeLinePhasesId]
    )
    return result;
}

const deletePipeLinePhasesService = async (pipeLinePhasesId) => {
    const [result] = await dbConnection.query('DELETE FROM pipeLinePhases WHERE Id=?',
        [pipeLinePhasesId]
    );
    return result;
}

module.exports = {
    postPipeLinePhasesService,
    getAllPipeLinePhasesService,
    getByIdPipeLinePhasesService,
    updatePipeLinePhasesService,
    deletePipeLinePhasesService
}