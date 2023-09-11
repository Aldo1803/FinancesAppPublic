const express = require('express');
let router = express.Router();
const CategoryController = require('./controller');
const Authorization = require('../../middlewares/authenticated');
router.post('/new-category', Authorization.auth ,CategoryController.newCategory);
router.get('/get-categories',Authorization.auth ,CategoryController.getCategories);

module.exports = router;
