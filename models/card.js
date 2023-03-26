const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    major : {
        type: String,
        require: true
    },
    studyClass : {
        type: String,
        require: true
    },
    tags : {
        type: String,
        require: true
    },
    date : {
        type: Date,
        require: true
    },

    location : {
        type: String,
        require: true
    },

    creator: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Card', cardSchema)