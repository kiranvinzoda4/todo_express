const express = require('express');
const todo = require('../controllers/todo');

const router = express.Router();

router.post('/create', todo.createTodo);
router.get('/list', todo.getTodos);
router.post('/update/:todoId?', todo.updateTodo);
router.post('/delete/:todoId?', todo.deleteTodo);
router.get('/get-todo/:todoId?', todo.getTodo);

module.exports = router