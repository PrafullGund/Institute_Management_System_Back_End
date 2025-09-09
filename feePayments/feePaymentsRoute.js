const express = require('express');
const router = express.Router();
const feePaymentsController = require('../feePayments/feePaymentsController');

router.post('/', feePaymentsController.postFeePaymentsController);
router.get('/', feePaymentsController.getAllFeePaymentController);
router.get('/:id', feePaymentsController.getByIdFeePaymentsController);
router.put('/:id',feePaymentsController.updateFeePaymentController);
router.delete('/:id',feePaymentsController.deleteFeePaymentController);

module.exports = router;
