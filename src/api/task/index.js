const express = require('express');
const router = express.Router();
const Controller = require('./controller');
const Authentication = require('../../middlewares/authenticated');
router.post('/new-task', Authentication.auth, Controller.newTask );
router.get('/get-task/:id', Authentication.auth, Controller.getTask );
router.post('/get-tasks', Authentication.auth, Controller.getTasks );
router.delete('/delete-task/:id', Authentication.auth, Controller.deleteTask );
router.put('/update-status/:id', Authentication.auth, Controller.updateTask);

module.exports = router;
