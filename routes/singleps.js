const express = require('express');
const router = express.Router();

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