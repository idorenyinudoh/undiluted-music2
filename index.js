const express = require('express');
const home = require('./routes/index');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('./public'));

app.use('/', home);

app.listen(port, () => {
    console.log(`Example listening at http://localhost:${port}`);
});