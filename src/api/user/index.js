
const express = require('express')
let router = express.Router();
const userController = require('./controller');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/validation', userController.emailValidation);
router.get('/get-user', userController.returnUser);
router.post('/reset-password/:id', userController.resetPassword);
router.post('/get-code/', userController.generateCode);
module.exports = router