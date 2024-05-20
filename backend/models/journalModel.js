const mongoose = require("mongoose");


const journalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    }, 
    tags: [{
        type: String
    }]
},
{ timestamps: true });


const Journal = mongoose.model('Journal', journalSchema)
module.exports = Journal;


