const Income = require('./model');
const UploaderService = require('../../services/img-uploader');
const getDocs = require('../../services/getDocsByDate');
const getMonthly = require('../../services/getMonthlyDocs');

const handleResponse = (res, err, data) => {
    if (err) return res.status(500).send({ error: err.message });
    if (data) return res.status(200).send({ data });
};

const uploadImageToFileService = async (file) => {
    file.mv('./uploads/' + file.name);
    let filePath = `uploads/${file.name}`;
    let mimetype = file.mimetype;
    await UploaderService.uploadFile(file.name, filePath, mimetype);
    return `https://[YOUR-BUCKET-NAME].s3.[YOUR-REGION].amazonaws.com/${fileName.name}`;
};

const newIncome = async (req, res) => {
    try {
        const { title, description, amount, category, date } = req.body;
        let income = new Income({ title, description, amount: parseFloat(amount), category, user: req.user._id, date });

        if (req.files) income.image = await uploadImageToFileService(req.files.file);

        const savedIncome = await income.save();
        handleResponse(res, null, savedIncome);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const editIncome = async (req, res) => {
    try {
        const { title, amount, description, category } = req.body;
        const incomeUpdates = { title, amount, description, category };
        const updatedIncome = await Income.findByIdAndUpdate(req.params.id, incomeUpdates, { new: true });
        handleResponse(res, null, updatedIncome);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const deleteIncome = async (req, res) => {
    try {
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        handleResponse(res, null, deletedIncome);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const getIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        handleResponse(res, null, income);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user._id });
        handleResponse(res, null, incomes);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const getCategory = async (req, res) => {
    try {
        const incomes = await Income.find({ category: req.params.category, user: req.user._id });
        handleResponse(res, null, incomes);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const uploadImage = async (req, res) => {
    try {
        const imageUrl = await uploadImageToFileService(req.files.file);
        handleResponse(res, null, imageUrl);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const getTotal = async (req, res) => {
    try {
        const filter = req.params.category ? { category: req.params.category, user: req.user._id } : { user: req.user._id };
        const incomes = await Income.find(filter);
        const total = incomes.reduce((acc, income) => acc + income.amount, 0);
        handleResponse(res, null, { total });
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const getIncomesByDate = async (req, res) => {
    try {
        if (req.params.date) {
            const monthtlyIncomes = await getDocs.getIncomes(req.params.date, req.user._id);
            return handleResponse(res, null, monthtlyIncomes);
        } else {
            const monthlyIncomes = await getMonthly.getMonthlyTotalIncomes(req.user._id);
            return handleResponse(res, null, monthlyIncomes);
        }
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const addImageToIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        income.image = await uploadImageToFileService(req.files.file);
        const updatedIncome = await income.save();
        handleResponse(res, null, updatedIncome);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

module.exports = {
    newIncome,
    editIncome,
    deleteIncome,
    getIncome,
    getIncomes,
    getCategory,
    uploadImage,
    getTotal,
    getIncomesByDate,
    addImageToIncome
};
