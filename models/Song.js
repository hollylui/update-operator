const {Schema, model} = require('mongoose');


const SongSchema = new Schema({
    dateCreated:{type:Date, required:true, default:Date.now},
    title:{type:String, required:true},
    artist:{type:String, required:true},
    genre:{type:String, required:true},
    tags:[{type:String, required:false}]
})

const Song = model('Song', SongSchema);

module.exports = Song;
