const Task = require('./model');
const moment = require('moment');

const newTask = async (req, res) => {
    try {
        const { name, date, description } = req.body;
        const userId = req.user._id;

        let task = new Task({
            name,
            date: moment(date).format(),
            description,
            user: userId
        });

        const savedTask = await task.save();
        res.status(200).send({ task: savedTask });
    } catch (err) {
        res.status(500).send({ message: 'Error creating task', error: err.message });
    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const task = await Task.findById(id);

        if (task && task.user == userId) {
            res.status(200).send({ task });
        } else {
            res.status(404).send({ message: 'Task not found or unauthorized' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching task', error: err.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        res.status(200).send({ tasks });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching tasks', error: err.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const task = await Task.findById(id);

        if (task && task.user == userId) {
            await task.remove();
            res.status(200).send({ message: 'Task deleted' });
        } else {
            res.status(404).send({ message: 'Task not found or unauthorized' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error deleting task', error: err.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const task = await Task.findById(id);

        if (task && task.user == userId) {
            task.status = !task.status;  // toggle status
            const updatedTask = await task.save();
            res.status(200).send({ task: updatedTask });
        } else {
            res.status(404).send({ message: 'Task not found or unauthorized' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error updating task', error: err.message });
    }
}

module.exports = { newTask, deleteTask, updateTask, getTask, getTasks };
