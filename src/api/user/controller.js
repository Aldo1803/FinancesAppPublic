const bcrypt = require('bcrypt');
const User = require('./model');
const jwt = require('jsonwebtoken');
const validation = require('../validation/controller');
const nodemailer = require('nodemailer');
const SecretCode = require('../validation/model');

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret'; // Get from environment variable
const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;


const signUp = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({ email, name, password: hashedPassword });
        await user.save();

        // Assuming you'll uncomment this later
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: EMAIL,
        //         pass: EMAIL_PASS
        //     }
        // });

        return res.status(200).send({ message: 'Registro realizado correctamente' });

    } catch (err) {
        return res.status(500).send({ message: 'Error saving user', error: err.message });
    }
}

const emailValidation = async (req, res) => {
    validation.validation(req.body.email);
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.status) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ user: user._id }, SECRET_KEY, { expiresIn: '14d' });
                return res.status(200).send({ token });
            } else {
                return res.status(400).send({ message: 'Incorrect password' });
            }
        } else {
            return res.status(400).send({ message: 'User not found or not activated' });
        }

    } catch (err) {
        return res.status(500).send({ message: 'Error during login', error: err.message });
    }
}


const returnUser = (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token, SECRET_KEY);
        if (user) {
            return res.status(200).send({ user });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Error returning user', error: err.message });
    }
}





const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const newPassword = await bcrypt.hash(req.body.password, 10);

        const valid = await SecretCode.findById(id);

        if (valid) {
            const userToUpdate = await User.findOne({ email: valid.email });

            if (userToUpdate) {
                userToUpdate.password = newPassword;
                await User.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true });

                return res.status(200).send({ message: 'Password updated successfully' });
            } else {
                return res.status(400).send({ message: 'User not found' });
            }
        } else {
            return res.status(400).send({ message: 'Invalid reset code' });
        }

    } catch (err) {
        return res.status(500).send({ message: 'Error resetting password', error: err.message });
    }
}

module.exports = {
    signUp,
    login,
    returnUser,
    resetPassword
};