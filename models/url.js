const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://hashinsert:mongooseHI@cluster0.ajmcdal.mongodb.net/hi_shorturl?retryWrites=true&w=majority')
.then(() => console.log("connected to MongoDB..."))
.catch((err) => console.error(err));

function idToShortURL(n)
{
    // Map to store 62 possible characters
    let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shorturl = [];
    // Convert given integer id to a base 62 number
    while (n)
    {
    // use above map to store actual character
    // in short url
    shorturl.push(map[n % 62]);
    n = Math.floor(n / 62);
    }
    // Reverse shortURL to complete base conversion
    shorturl.reverse();
    return shorturl.join("");
}

// Schema 
// Types: String, Booleans, Date, Arrays, Numbers, Buffers
const urlSchema = new mongoose.Schema({
    url: String,
    alias: String,
    created: {type: Date, default: Date.now},
    used: {type: Date, default: Date.now}
}, { collection : 'urls' })

// Models 
const UrlModel = mongoose.model('Url', urlSchema)

// Creating URL document
function saveShortUrl(url, alias){
    console.log(`Saving for ${url}`)
    const urlObj = new UrlModel({
        url : url,
        alias : alias,
    })
    
    urlObj.save().then( result => console.log(result));
}

module.exports = {idToShortURL, saveShortUrl}