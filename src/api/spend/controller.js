const Spend = require('./model');
const UploaderService = require('../../services/img-uploader');

const handleImageUpload = async (file) => {
    file.mv('./uploads/' + file.name);
    let filePath = `uploads/${file.name}`;
    let mimetype = file.mimetype;
    await UploaderService.uploadFile(file.name, filePath, mimetype);
    return `https://[YOUR-BUCKET-NAME].s3.[YOUR-REGION].amazonaws.com/${fileName.name}`;
};

const newSpend = async (req, res) => {
    try {
        const { title, description, amount, category, date } = req.body;
        let imageUrl;

        if (req.files) {
            imageUrl = await handleImageUpload(req.files.file);
        }

        const spend = new Spend({
            title, description, amount: parseFloat(amount), category,
            user: req.user._id,
            date: date || undefined,
            image: imageUrl
        });

        const savedSpend = await spend.save();
        res.status(200).send({ savedSpend });
    } catch (err) {
        res.status(500).send({ message: 'Error creating spend', error: err.message });
    }
};

const editSpend = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, amount, category } = req.body;
        const spend = await Spend.findById(id);

        if (!spend) {
            return res.status(404).send({ message: 'Spend not found' });
        }

        spend.title = title;
        spend.description = description;
        spend.amount = parseFloat(amount);
        spend.category = category;

        const updatedSpend = await spend.save();
        res.status(200).send({ updatedSpend });
    } catch (err) {
        res.status(500).send({ message: 'Error editing spend', error: err.message });
    }
};

const addImageToSpend = async (req, res) => {
    try {
        const { id } = req.params;
        const spend = await Spend.findById(id);

        if (!spend) {
            return res.status(404).send({ message: 'Spend not found' });
        }

        spend.image = await handleImageUpload(req.files.file);
        const updatedSpend = await spend.save();
        res.status(200).send({ spend: updatedSpend });
    } catch (err) {
        res.status(500).send({ message: 'Error adding image to spend', error: err.message });
    }
};

const deleteSpend = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSpend = await Spend.findByIdAndDelete(id);
        if (deletedSpend) {
            res.status(200).send({ deletedSpend });
        } else {
            res.status(404).send({ message: 'Spend not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error deleting spend', error: err.message });
    }
};

const getSpend = async (req, res) => {
    try {
        const { id } = req.params;
        const spend = await Spend.findById(id);
        if (spend) {
            res.status(200).send({ spend });
        } else {
            res.status(404).send({ message: 'Spend not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching spend', error: err.message });
    }
};

const getSpends = async (req, res) => {
    try {
        const spends = await Spend.find({ user: req.user._id });
        res.status(200).send({ spends });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching spends', error: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const spends = await Spend.find({ category, user: req.user._id });
        res.status(200).send({ spends });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching spends by category', error: err.message });
    }
};

const uploadImage = async (req, res) => {
    try {
        const fileName = await handleImageUpload(req.files.file);
        res.send({ doc: fileName.name });
    } catch (err) {
        res.status(500).send({ message: 'Error uploading image', error: err.message });
    }
};

const getTotal = async (req, res) => {
    try {
        let counter = 0;
        let spends;
        if (req.params.category) {
            spends = await Spend.find({ category: req.params.category, user: req.user._id });
        } else {
            spends = await Spend.find({ user: req.user._id });
        }
        spends.forEach(spend => counter += spend.amount);
        res.status(200).send({ total: counter });
    } catch (err) {
        res.status(500).send({ message: 'Error calculating total', error: err.message });
    }
};

const getSpendByDate = async (req, res) => {
    try {
        const { date } = req.params;
        let monthlySpends;

        if (date) {
            monthlySpends = await getDocs.getSpends(date, req.user._id);
        } else {
            monthlySpends = await getMonthly.getMonthlyTotalSpends(req.user._id);
        }

        res.status(200).send({ monthlySpends });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching spends by date', error: err.message });
    }
};

module.exports = {
    newSpend,
    editSpend,
    deleteSpend,
    getSpend,
    getSpends,
    getCategory,
    uploadImage,
    getTotal,
    getSpendByDate,
    addImageToSpend
};
