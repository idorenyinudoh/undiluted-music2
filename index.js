const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.listen(port, () => {
    console.log(`Example listening at http://localhost:${port}`);
});