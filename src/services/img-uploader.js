const config = require('../../config');
const fs = require('fs').promises;
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: config.awsAccesskeyID,
    secretAccessKey: config.awsSecretAccessKey
});

const uploadFile = async (fileName, filePath, type) => {
    try {
        const data = await fs.readFile(filePath);

        const params = {
            Bucket: 'YOUR_AWS_BUCKET_NAME', // Replace with your bucket name or use a config variable
            Key: fileName,
            Body: data,
            ContentType: type
        };

        const result = await s3.upload(params).promise();

        // Optionally, remove the uploaded file from the local system
        await fs.unlink(filePath);

        return { message: `File uploaded successfully at ${result.Location}` };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;  // Re-throwing the error to be handled by the caller function or middleware
    }
};

module.exports = { uploadFile };
