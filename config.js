const env = process.env.NODE_ENV || 'development'; // default to 'development'

const development = {
    app: {
        port: process.env.DEV_APP_PORT || 3000
    },
    database: {
        url: process.env.DEV_DB_URL
    },
    awsAccesskeyID: process.env.DEV_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.DEV_AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.DEV_S3_BUCKET_NAME || 'YOUR_AWS_BUCKET_NAME'
};

const testing = {
    app: {
        port: process.env.TEST_APP_PORT || 3001
    },
    database: {
        url: process.env.TEST_DB_URL
    },
    awsAccesskeyID: process.env.TEST_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.TEST_AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.TEST_S3_BUCKET_NAME || 'YOUR_AWS_BUCKET_NAME'
};

const production = {
    app: {
        port: process.env.PORT || 3002
    },
    database: {
        url: process.env.DB_URL
    },
    awsAccesskeyID: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.S3_BUCKET_NAME || 'YOUR_AWS_BUCKET_NAME'
};

const config = {
    development,
    testing,
    production
};

module.exports = config[env];
