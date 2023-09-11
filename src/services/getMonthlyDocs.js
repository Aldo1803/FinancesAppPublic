const getDocs = require('./getDocsByDate');
const moment = require('moment');

const getMonthlyTotal = async (getFunction, user) => {
    const period = moment().format('MM-YYYY');
    const docs = await getFunction(period, user);

    const total = docs.reduce((acc, doc) => acc + doc.amount, 0);

    return { total, docs };
}

const getMonthlyTotalSpends = async (user) => {
    return getMonthlyTotal(getDocs.getSpends, user);
}

const getMonthlyTotalIncomes = async (user) => {
    return getMonthlyTotal(getDocs.getIncomes, user);
}

module.exports = { getMonthlyTotalIncomes, getMonthlyTotalSpends };
