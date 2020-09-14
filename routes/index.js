const express = require('express');
const artistes = require('./artistes');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/artistes', artistes);
router.get('/artistes/:random', artistes);

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

const genres = {
    'afrobeats': 'Afrobeats',
    'afro-fusion': 'Afro-Fusion',
    'afro-house': 'Afro-House',
    'afro-pop': 'Afro-Pop',
    'alternative-r&b': 'Alternative R&B',
    'alternative-rock': 'Alternative Rock',
    'banku': 'Banku',
    'blues': 'Blues',
    'contemporary-r&b': 'Contemporary R&B',
    'dancehall': 'Dancehall',
    'electronic': 'Electronic',
    'folk': 'Folk',
    'fuji': 'Fuji',
    'gospel': 'Gospel',
    'highlife': 'Highlife',
    'hip-hop': 'Hip-Hop',
    'house': 'House',
    'igbo-gospel-hip-hop': 'Igbo Gospel Hip-Hop',
    'igbo-highlife': 'Igbo Highlife',
    'igbo-rap': 'Igbo Rap',
    'indie-pop': 'Indie-Pop',
    'jazz': 'Jazz',
    'neo-soul': 'Neo-Soul',
    'pop': 'Pop',
    'r&b': 'R&B',
    'ragga': 'Ragga',
    'reggae': 'Reggae',
    'soca': 'Soca',
    'soul': 'Soul',
    'trap': 'Trap',
    'world': 'World',
    'yoruba': 'Yoruba'
}

router.get('/:title', (req, res) => {
    if(genres[`${req.params.title}`]) res.render('genre', {title: genres[`${req.params.title}`]});
});

module.exports = router;