const knex = require("../config/config");
const model = require("../models/user");
const auth = require("./auth")
const Joi = require('joi');

const createUser = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: false, message: error.details[0].message });
        }

        const pass = req.body.password;
        const encryptedPassword = await auth.generatePassword(pass);
        req.body.password = encryptedPassword;
        const data = await model.insertUser(req.body);
        if (data) {
            res.status(200).json({
                error: false,
                message: "User has been created",
                data: data,
            });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: true, message: "Something went wrong", data: e });
    }
    res.end();
};


const login = async (req, res) => {
    try {
        const schema = Joi.object({
            password: Joi.string().required(),
            email: Joi.string().email().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: false, message: error.details[0].message });
        }

        const { email, password } = req.body;
        user_data = await model.getUserByEmail(email);
        if (user_data) {
            const test = await auth.comparePasswords(password, user_data.password);
            if (test) {
                delete user_data.password;
                const token = auth.getToken(JSON.parse(JSON.stringify(user_data)));
                res.json({
                    error: false,
                    message: "user data.",
                    data: { "token": token, "user": user_data },
                });
            } else {
                res.json({
                    error: false,
                    message: "Wrong password.",
                    data: [],
                });
            }
        } else {
            res.json({
                error: false,
                message: "Email is not found.",
                data: [],
            });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: true, message: "Something went wrong", data: e });
    }
    res.end();
};


// const updateTodo = async (req, res) => {
//     try {
//         const todoId = req.params.todoId;

//         const update = await model.updateTodo(todoId, req.body);
//         if (update) {
//             res.json({
//                 error: false,
//                 message: "Todo has been updated",
//             });
//         }
//     } catch (error) {
//         res.json({
//             error: true,
//             message: "something went wrong",
//             data: error,
//         });
//     }
//     return res.end();
// };


// const getTodos = async (req, res) => {
//     try {
//         const rows = await model.getTodos();
//         res.status(200).json({
//             error: false,
//             message: "Todos received successfully.",
//             data: rows
//         });
//         res.end();
//     } catch (e) {
//         console.log(e);
//         res.json({ error: true, message: "Something went wrong", data: e });
//     }
//     res.end();
// };

// const deleteTodo = async (req, res) => {
//     try {
//         const todoId = req.params.todoId;

//         const status = await model.deleteTodo(todoId);

//         if (status) {
//             res.json({
//                 error: false,
//                 message: "Todo has been deleted",
//             });
//         }
//     } catch (error) {
//         res.json({
//             error: true,
//             message: "something went wrong",
//             data: error,
//         });
//     }
//     return res.end();
// };

// const getTodo = async (req, res) => {
//     try {
//         const todoId = req.params.todoId;
//         const data = await model.getTodo({ id: todoId });
//         if (data.length) {
//             res.json({
//                 error: false,
//                 message: "success. Todo details receive",
//                 data: data,
//             });
//         } else {
//             res.json({
//                 error: false,
//                 message: "sorry. no record found",
//                 data: [],
//             });
//         }
//     } catch (error) {
//         res.json({
//             error: true,
//             message: "something went wrong",
//             data: error,
//         });
//     }
//     return res.end();
// };

module.exports = {
    createUser,
    login,
    // updateTodo,
    // deleteTodo,
    // getTodo,
};
