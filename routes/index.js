const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/artistes', (req, res) => {
    res.render('artistes');
});

router.get('/singles', (req, res) => {
    res.render('singleps', {
        title: 'Singles'
    });
});

router.get('/eps', (req, res) => {
    res.render('singleps', {
        title: 'EPs'
    });
});

module.exports = router;