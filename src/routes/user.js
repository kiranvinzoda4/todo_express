const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router.get('/list', user.getTodos);
router.post('/update/:userId?', user.updateUser);
router.post('/delete/:userId?', user.deleteUser);
router.get('/get-todo/:userId?', user.getUser);

module.exports = router