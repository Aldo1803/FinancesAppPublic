const Category = require('./model');

const handleResponse = (res, err, data) => {
    if (err) return res.status(500).send({ error: err.message });
    if (data) return res.status(200).send({ data });
};

const newCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const formattedCategory = category.charAt(0).toLowerCase() + category.slice(1);
        const newCategory = new Category({
            category: formattedCategory,
            user: req.user._id
        });
        const savedCategory = await newCategory.save();
        handleResponse(res, null, savedCategory);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        handleResponse(res, null, categories);
    } catch (err) {
        handleResponse(res, err, null);
    }
};

module.exports = { newCategory, getCategories };
