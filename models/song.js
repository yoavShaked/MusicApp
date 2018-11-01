const mongoose = require('mongoose');
const Joi = require('joi');

const songSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:2
    },
    url:{
        type:String,
        required:true,
        minlength:5
    },
    artist:{
        type:String,
        required:true,
        minlength:2,
    },
    isTop10:{
        type:Boolean,
        default:false
    }
});

const Song = mongoose.model('Song', songSchema);

function validateSong(song){
    return Joi.validate(song, {
        name: Joi.string().min(2).required(),
        url: Joi.string().min(5).required(),
        artist: Joi.string().required(),
        isTop10: Joi.boolean()
    });
}

module.exports = {
    songSchema,
    validateSong,
    Song
}