const featuresJoi = require('../features/featuresJoi');
const featuresService = require('../features/featuresService');

const postFeaturesController = async (req, res) => {
    try {
        const { error } = featuresJoi.featuresJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await featuresService.postFeaturesService(req.body);
        res.status(201).json({ success: true, message: 'Features Added Successfully', data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllFeaturesController = async (req, res) => {
    try {

        const result = await featuresService.getAllFeaturesService();
        res.status(200).json({ success: true, data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getFeaturesByIdController = async (req, res) => {
    try {
        const featuresId = req.params.id;
        const result = await featuresService.getFeaturesByIdService(featuresId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Features Not Found' });
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateFeaturesController = async (req, res) => {
    try {
        const featuresId = req.params.id;
        const featuresData = req.body;
        const result = await featuresService.updateFeaturesService(featuresId, featuresData);
        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Features Added Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Features Not Found' });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteFeaturesController = async (req, res) => {
    try {
        const featuresId = req.params.id;
        const result = await featuresService.deleteFeaturesService(featuresId);
        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Features Deleted Successfully' })
        } else {
            res.status(404).json({ success: false, message: 'Features Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postFeaturesController,
    getAllFeaturesController,
    getFeaturesByIdController,
    updateFeaturesController,
    deleteFeaturesController
}