const express = require('express');
const router = express.Router();
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

router.get('/:genre', (req, res) => {
    if(genres[`${req.params.genre}`]) res.render('genre', {genre: genres[`${req.params.genre}`]});
});

module.exports = router;