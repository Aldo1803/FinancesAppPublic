const getDocs = require('../../services/getDocsByDate');
const moment = require('moment');
const Monthly = require('./model');
const getMonthlyDocs = require('../../services/getMonthlyDocs');

const monthlyIncomes = async (req, res) => {
    try {
        const total = await getMonthlyDocs.getMonthlyTotalIncomes(req.user._id);
        res.status(200).send({ total });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching monthly incomes', error: err.message });
    }
}

const monthlySpends = async (req, res) => {
    try {
        const total = await getMonthlyDocs.getMonthlyTotalSpends(req.user._id);
        res.status(200).send({ total });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching monthly spends', error: err.message });
    }
}

const calculateMonthlyUtilities = async (req, res) => {
    try {
        const period = moment().format('MM-YYYY');
        const today = moment().format('DD-MM-YYYY');

        const reportExists = await Monthly.findOne({ cutoff_date: today, user: req.user._id });
        if (reportExists) {
            return res.status(403).send({ message: 'Ya generaste un reporte el dia de hoy' });
        }

        const report = new Monthly();
        const totalIncome = await getMonthlyDocs.getMonthlyTotalIncomes(req.user._id);
        const totalSpend = await getMonthlyDocs.getMonthlyTotalSpends(req.user._id);

        report.income = totalIncome.total;
        report.spend = totalSpend.total;
        report.utilities = totalIncome.total - totalSpend.total;
        report.cutoff_date = today;
        report.monthIncome = await getDocs.getIncomes(period, req.user._id);
        report.monthSpend = await getDocs.getSpends(period, req.user._id);
        report.user = req.user._id;

        const savedReport = await report.save();
        res.status(200).send({ savedReport });
    } catch (err) {
        res.status(500).send({ message: 'Error calculating monthly utilities', error: err.message });
    }
}

const getReports = async (req, res) => {
    try {
        const reports = await Monthly.find({ user: req.user._id });
        res.status(200).send({ reports });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching reports', error: err.message });
    }
}

const getReport = async (req, res) => {
    try {
        const report = await Monthly.findById(req.params.id);
        if (report) {
            res.status(200).send({ report });
        } else {
            res.status(404).send({ message: 'Report not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching report', error: err.message });
    }
}

const deleteReport = async (req, res) => {
    try {
        const deletedReport = await Monthly.findByIdAndDelete(req.params.id);
        if (deletedReport) {
            res.status(200).send({ deletedReport });
        } else {
            res.status(404).send({ message: 'Report not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error deleting report', error: err.message });
    }
}

module.exports = {
    monthlySpends,
    monthlyIncomes,
    calculateMonthlyUtilities,
    getReports,
    getReport,
    deleteReport
};
