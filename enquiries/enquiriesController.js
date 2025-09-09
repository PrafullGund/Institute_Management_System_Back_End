const enquiriesService = require('../enquiries/enquiriesService');

const postEnquiriesController = async (req, res) => {
    try {

        const result = await enquiriesService.postEnquiriesService(req.body);
        res.status(201).json({ success: true, message: 'Enquiries Added Successfully' });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getAllEnquiriesController = async (req, res) => {
    try {
        const result = await enquiriesService.getAllEnquiriesService();
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getByIdEnquiriesController = async (req, res) => {
    try {
        const enquiriesId = req.params.id;
        const result = await enquiriesService.getByIdEnquiriesService(enquiriesId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Enquiries Not Found' })
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const updateEnquiriesController = async (req, res) => {
    try {
        const enquiriesId = req.params.id;
        const enquiriesData = req.body;
        const result = await enquiriesService.updateEnquiriesService(enquiriesId, enquiriesData);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Enquiries Update Successfully', data: result });
        } else {
            res.status(404).json({ success: false, message: 'Enquiries Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const deleteEnquiriesController = async (req, res) => {
    try {
        const enquiriesId = req.params.id;
        const result = await enquiriesService.deleteEnquiriesService(enquiriesId);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Enquiries Delete Successfully' })
        } else {
            res.status(404).json({ success: false, message: 'Enquiries Not Found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

module.exports = {
    postEnquiriesController,
    getAllEnquiriesController,
    getByIdEnquiriesController,
    updateEnquiriesController,
    deleteEnquiriesController
}