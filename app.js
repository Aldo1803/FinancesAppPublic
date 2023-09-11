const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const UserRoutes = require('./src/api/user/index');
const IncomeRoutes = require('./src/api/income/index');
const SpendRoutes = require('./src/api/spend/index');
const CategoryRoutes = require('./src/api/category/index');
const MonthlyRoutes = require('./src/api/monthlyTotal/index');
const TaskRoutes = require('./src/api/task/index.js');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true,
}));
app.use(express.static('uploads'));

// Routes
app.use('/user', UserRoutes);
app.use('/income', IncomeRoutes);
app.use('/spend', SpendRoutes);
app.use('/category', CategoryRoutes);
app.use('/monthly', MonthlyRoutes);
app.use('/task', TaskRoutes);

module.exports = app;
