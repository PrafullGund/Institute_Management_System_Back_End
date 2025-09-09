const dbConnection = require('../config/connection');

const postFeePaymentsService = async (feePaymentsData) => {
    const query = `INSERT INTO feePayments (admissionId, amountCredited, balanceAmount, paymentDate, paymentMethod, nextDueDate) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await dbConnection.query(query, [
        feePaymentsData.admissionId,
        feePaymentsData.amountCredited,
        feePaymentsData.balanceAmount,
        feePaymentsData.paymentDate,
        feePaymentsData.paymentMethod,
        feePaymentsData.nextDueDate
    ]);
    return result;
};

const getAllFeePaymentService = async () => {
    const [rows] = await dbConnection.query(`SELECT * FROM feePayments`);
    return rows;
};

const getByIdFeePaymentsService = async (feePaymentsId) => {
    const [result] = await dbConnection.query(`SELECT * FROM feePayments WHERE Id=?`, feePaymentsId);
    return result;
}

const updateFeePaymentService=async(feePaymentsId,feePaymentsData)=>{
    const feePayments={
        admissionId:feePaymentsData.admissionId,
        amountCredited:feePaymentsData.amountCredited,
        balanceAmount:feePaymentsData.balanceAmount,
        paymentDate:feePaymentsData.paymentDate,
        paymentMethod:feePaymentsData.paymentMethod,
        nextDueDate:feePaymentsData.nextDueDate
    }
    const [result]=await dbConnection.query(`UPDATE feePayments SET ? WHERE Id=?`, [feePayments,feePaymentsId]);
    return result;
}

const deleteFeePaymentService=async(feePaymentsId)=>{
    const [result]=await dbConnection.query('DELETE FROM feePayments WHERE Id=?',[feePaymentsId]);
    return result;
}

module.exports = {
    postFeePaymentsService,
    getAllFeePaymentService,
    getByIdFeePaymentsService,
    updateFeePaymentService,
    deleteFeePaymentService
}