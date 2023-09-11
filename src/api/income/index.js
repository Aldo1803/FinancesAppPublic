
const express = require('express');
let router = express.Router();
const IncomeController = require('./controller');
const Authentication = require('../../middlewares/authenticated');
router.post('/new-income', Authentication.auth , IncomeController.newIncome);
router.put('/edit-income', Authentication.auth, IncomeController.editIncome);
router.delete('/delete-income/:id', Authentication.auth, IncomeController.deleteIncome);
router.get('/get-incomes', Authentication.auth, IncomeController.getIncomes);
router.get('/get-income/:id', Authentication.auth, IncomeController.getIncome);
router.get('/category/:category', Authentication.auth, IncomeController.getCategory);
router.post('/upload-image', Authentication.auth, IncomeController.uploadImage);
router.get('/get-total/:category?', Authentication.auth, IncomeController.getTotal);
router.get('/monthly/:date?', Authentication.auth, IncomeController.getIncomesByDate);
router.put('/add-image/:id', Authentication.auth, IncomeController.addImageToIncome);

module.exports = router;