const Spend = require('../api/spend/model');
const Income = require('../api/income/model');

const getDocsByDate = async (Model, date, user) => {
    try {
        const docs = await Model.find({ user: user });
        return docs.filter(doc => doc.date.includes(date));
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}

const getSpends = async (date, user) => {
    return getDocsByDate(Spend, date, user);
}

const getIncomes = async (date, user) => {
    return getDocsByDate(Income, date, user);
}

module.exports = { getSpends, getIncomes };
