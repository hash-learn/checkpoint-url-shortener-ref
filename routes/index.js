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
    const {url, alias} = req.body;
    if(url && alias) {
        URL_ALIASES.push({alias, url})
        res.send(`Successfully added ${alias} !! `);
    } else {
        res.status(403).send('Both URL and the alias are required!!');        
    }
})

router
.route('/mapping')
.get( (req, res) => {
        res.send(URL_ALIASES);
})

router
.route('/shorten')
.get((req, res) => {
    res.redirect('/');
})
.post( (req, res) => {
    const {url, alias} = req.body;
    let aliasToDisplay;
    if(alias) {
        aliasToDisplay = alias;
    } else {
        const timestamp_secs = Math.floor(Date.now() /1000)
        aliasToDisplay = idToShortURL(timestamp_secs);
        // Creating the url-alias mapping in MongoDB 
        saveShortUrl(url, aliasToDisplay);    
    }

    // Redirecting to users endpoint after adding the new user
    const response = `<link rel="stylesheet" type="text/css" href="index.css">
    <body>
    <div id="root" >
    <br/>
    <h1>${DOMAIN_NAME + '/' + aliasToDisplay}</h1>
    <button onclick="location.href = '/';" class="btn sh-btn" >Shorten another URL</button>
    </div>
    </body>`;
    res.send(response);
})

// Short URL Route
router
.route('/:alias')
.get((req,res) => {
    const { alias } = req.params;
    UrlModel.findOne({ alias: alias}, 'url', function (err, urlObj) {
        if(!urlObj){
            res.status(404).send("Link not found !!")
        } else{
            res.redirect(urlObj.url)            
        }
    });
})

module.exports = router;