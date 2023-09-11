const Inventory = require('./model');

const addProduct = async (req, res) => {
    try {
        const { name, stock, sku } = req.body;
        const inventory = new Inventory({
            name,
            stock: Number(stock),
            sku
        });

        const objCreated = await inventory.save();
        res.status(200).send({ objCreated });
    } catch (err) {
        res.status(500).send({ message: 'Error adding product', error: err.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Inventory.find({ userId: req.user._id });
        res.status(200).send({ products });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching products', error: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Inventory.findById(req.params.id);
        if (product) {
            res.status(200).send({ product });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching product', error: err.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, stock, sku } = req.body;
        const product = await Inventory.findByIdAndUpdate(req.params.id, {
            name,
            stock: Number(stock),
            sku
        }, { new: true });

        if (product) {
            res.status(200).send({ product });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error updating product', error: err.message });
    }
}

const adjustStock = async (req, res, adjustment) => {
    try {
        const product = await Inventory.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        product.stock += adjustment;
        const updatedProduct = await Inventory.findByIdAndUpdate(req.params.id, product, { new: true });
        res.status(200).send({ updatedProduct });
    } catch (err) {
        res.status(500).send({ message: 'Error adjusting stock', error: err.message });
    }
}

const plusStock = (req, res) => adjustStock(req, res, 1);

const minusStock = (req, res) => adjustStock(req, res, -1);

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    plusStock,
    minusStock
};
