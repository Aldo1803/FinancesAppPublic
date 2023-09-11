const express = require('express');

let router = express.Router();
const MonthlyController = require('./controller');
const Authentication = require('../../../src/middlewares/authenticated');

router.get('/period-spends', Authentication.auth , MonthlyController.monthlySpends);
router.get('/period-incomes', Authentication.auth, MonthlyController.monthlyIncomes);
router.get('/utilities', Authentication.auth, MonthlyController.calculateMonthlyUtilities);
router.get('/get-reports', Authentication.auth, MonthlyController.getReports);
router.get('/report/:id', Authentication.auth, MonthlyController.getReport);
router.delete('/delete/:id', Authentication.auth, MonthlyController.deleteReport);


module.exports = router;