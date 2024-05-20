const mongoose = require("mongoose");

const anonymousSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    options: {
        type: String,
        enum: ['happy', 'sad', 'depression', 'adhd', 'other'],
        required: true
    },
    tags: [
        {
            type: String
        }
    ]
},
{ timestamps: true });

const Anonymous = mongoose.model('Anonymous', anonymousSchema);
module.exports = Anonymous;
