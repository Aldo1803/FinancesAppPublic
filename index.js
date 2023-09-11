const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "YOUR_LOCAL_DB_CONNECTION_STRING"; // Add this to an environment variable or a config file.

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
        app.listen(port, () => {
            console.log(`App listening on port ${port}!`);
        });
    } else {
        console.log('Error in DB connection:', err);
    }
});
