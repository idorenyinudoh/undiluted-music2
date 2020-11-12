const express = require('express');
const router = express.Router();
const db = require('../db');

const urlTitle = {};

async function fetchArtistes() {
    const collection = db.get().collection('artistes');

    const artistes = await collection.find({},{sort:{title:1},projection:{_id:0}}).toArray();

    artistes.forEach(el => {
        urlTitle[el.url] = el.title;
    });

    console.log(urlTitle);
};

router.get('/artistes', (req, res) => {
    if(Object.keys(urlTitle).length > 0) res.render('artistes', {artistes: urlTitle});
    else fetchArtistes().then(() => {
        res.render('artistes', {artistes: urlTitle});
    });
});

router.get('/artistes/:artiste', (req, res) => {
    if(Object.keys(urlTitle).length > 0) res.render('artiste', {artiste: urlTitle[`${req.params.artiste}`]});
    else fetchArtistes().then(() => {
        if(urlTitle[`${req.params.artiste}`]) res.render('artiste', {artiste: urlTitle[`${req.params.artiste}`]});
        else res.redirect('../page-not-found');
    })
});

module.exports = router;