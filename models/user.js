const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type: String,
        required : true
    },
    username : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    major : {
        type: String,
        required : true
    },
    tags : {
        type: String,
        required : true
    },
    joinedGroups : {
        type: String,
        required : false
    },
    course : {
        type: String,
        required: false

    },
    userimg : {
        type: String,
        required : false
    },

    createdCards: [{
        type : Schema.Types.ObjectId,
        ref: 'Card'
    }]

});

module.exports = mongoose.model('User', userSchema);