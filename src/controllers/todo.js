const knex = require("../config/config");
const model = require("../models/todo");
const Joi = require('joi');
const utility = require('../utility/functions')

const createTodo = async (req, res) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().allow(null),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: false, message: error.details[0].message });
        }

        const dataUri = req.body.image;
        if (dataUri) {
            const url = utility.uploadImage(dataUri);
            req.body.image = url;
        } else {
            req.body.image = null;
        }
        req.body.user_id = req.user.id

        const data = await model.insertTodo(req.body);
        if (data) {
            res.status(200).json({
                error: false,
                message: "Todo has been created",
                data: data,
            });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: true, message: "Something went wrong", data: e });
    }
    res.end();
};

const updateTodo = async (req, res) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().allow(null),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: false, message: error.details[0].message });
        }
        userId = req.user.id;
        const todoId = req.params.todoId;
        todoCheck = await model.getTodoByIdWithUser(todoId, userId);
        if (!todoCheck) {
            res.json({
                error: true,
                message: "Todo not found.",
            });
        }

        const dataUri = req.body.image;
        if (dataUri) {
            const url = utility.uploadImage(dataUri);
            req.body.image = url;
        } else {
            req.body.image = null;
        }
        const update = await model.updateTodo(todoId, req.body);
        if (update) {
            res.json({
                error: false,
                message: "Todo has been updated",
            });
        }
    } catch (error) {
        res.json({
            error: true,
            message: "something went wrong",
            data: error,
        });
    }
    return res.end();
};


const getTodos = async (req, res) => {
    try {
        const user_id = req.user.id;
        const rows = await model.getTodosByUser(user_id);
        res.status(200).json({
            error: false,
            message: "Todos received successfully.",
            data: rows
        });
        res.end();
    } catch (e) {
        console.log(e);
        res.json({ error: true, message: "Something went wrong", data: e });
    }
    res.end();
};

const deleteTodo = async (req, res) => {
    try {
        userId = req.user.id;
        const todoId = req.params.todoId;
        todoCheck = await model.getTodoByIdWithUser(todoId, userId);
        if (!todoCheck) {
            res.json({
                error: true,
                message: "Todo not found.",
            });
        }

        const status = await model.deleteTodo(todoId);

        if (status) {
            res.json({
                error: false,
                message: "Todo has been deleted",
            });
        }
    } catch (error) {
        res.json({
            error: true,
            message: "something went wrong",
            data: error,
        });
    }
    return res.end();
};

const getTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        data = await model.getTodo(todoId);

        const imageName = data.image;
        const dataUri = utility.imageToDataUri(imageName);
        data.image = dataUri

        if (data) {
            res.json({
                error: false,
                message: "success. Todo details receive",
                data: data,
            });
        } else {
            res.json({
                error: false,
                message: "sorry. no record found",
                data: [],
            });
        }
    } catch (error) {
        res.json({
            error: true,
            message: "something went wrong",
            data: error,
        });
    }
    return res.end();
};
module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodo,
};
