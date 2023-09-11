
const express = require('express');
let router = express.Router();
const SpendController = require('./controller');
const Authentication = require('../../middlewares/authenticated');
router.put('/edit-spend', Authentication.auth, SpendController.editSpend);
router.post('/new-spend', Authentication.auth, SpendController.newSpend);
router.delete('/delete-spend/:id', Authentication.auth, SpendController.deleteSpend);
router.get('/get-spends', Authentication.auth, SpendController.getSpends);
router.get('/get-spend/:id', Authentication.auth, SpendController.getSpend);
router.get('/category/:category', Authentication.auth, SpendController.getCategory);
router.post('/upload-image', Authentication.auth, SpendController.uploadImage);
router.get('/get-total/:category?', Authentication.auth, SpendController.getTotal);
router.get('/monthly/:date?', Authentication.auth, SpendController.getSpendByDate);
router.put('/add-image/:id', Authentication.auth, SpendController.addImageToSpend);

module.exports = router;