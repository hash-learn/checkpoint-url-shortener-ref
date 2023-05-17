const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ajmcdal.mongodb.net/hi_shorturl?retryWrites=true&w=majority`)
.then(() => console.log("connected to MongoDB..."))
.catch((err) => console.error(err));

function idToShortURL(n)
{
// write your code here
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
// write your code here
}

module.exports = {idToShortURL, saveShortUrl, UrlModel}