const express = require('express');
const home = require('./home');
const artistes = require('./artistes');
const singleps = require('./singleps');
const genre = require('./genre');
const router = express.Router();

router.get('/', home);
router.get('/artistes', artistes);
router.get('/singles', singleps);
router.get('/eps', singleps);
router.get('/:genre', genre);
router.get('/artistes/:random', artistes);

module.exports = router;