const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./routes/todo.js');
const publicUrl = require('./routes/publicUrl.js');
const auth = require('./controllers/auth.js')

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '10mb' }));

app.use('/public', publicUrl);

app.use('/todo', auth.verifyToken, todo);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});