const express = require('express');
const router = express.Router();
const artistes = {
    '2-baba': '2 Baba',
    '9ice': '9ice',
    'abstraktt': 'Abstraktt',
    'adekunle-gold': 'Adekunle Gold',
    'ajebutter22': 'Ajebutter22',
    'asa': 'Asa',
    'ayanfe': 'Ayanfe'
}

router.get('/artistes', (req, res) => {
    res.render('artistes');
});
router.get('/artistes/:artiste', (req, res) => {
    if(artistes[`${req.params.artiste}`]) res.render('artiste', {artiste: artistes[`${req.params.artiste}`]});
});

module.exports = router;