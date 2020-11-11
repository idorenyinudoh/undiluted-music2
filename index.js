const express = require('express');
const index = require('./routes/index');
const db = require('./db');
require('dotenv').config();
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('./dist'));

db.connect(process.env.CONNECTION_STRING, 'main');

app.use('/', index);

app.listen(port, () => {
    console.log(`Example listening at http://localhost:${port}`);
});