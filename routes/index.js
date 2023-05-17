const {saveShortUrl, idToShortURL, UrlModel} = require('../models/url');

const express = require('express');
const router = express.Router();

const URL_ALIASES = [];

const DOMAIN_NAME = process.env.HOSTNAME || "localhost:3000"

// Info service examples
router
.route('/i/google')
.get((req, res) => {
    res.json({"service": "/i/google",
    "website" : "Google",
    "url" : "https://www.google.com"})
})

router
.route('/i/github')
.get((req, res) => {
    res.json({"service": "/i/github",
    "website" : "GitHub",
    "url" : "https://www.github.com"})
})

// Redirect service examples
router
.route('/r/google')
.get((req, res) => {
    res.redirect('https://www.google.com')
})

router
.route('/r/github')
.get((req, res) => {
    res.redirect('https://www.github.com')
})

router
.route('/r/:alias')
.get((req, res) => {
    const { alias } = req.params;
    const mappingObj = URL_ALIASES.find((mapping) => mapping.alias === alias)
    if(mappingObj) {
        res.redirect(mappingObj.url)
    } else {
        res.status(403).send('Alias not found!!')
    }
})

router
.route('/map')
.post( (req, res) => {
// write your code here
})

router
.route('/mapping')
.get( (req, res) => {
// write your code here
})

router
.route('/shorten')
.get((req, res) => {
    res.redirect('/');
})
.post( (req, res) => {
// write your code here
})

// Short URL Route
router
.route('/:alias')
.get((req,res) => {
// write your code here
})

module.exports = router;