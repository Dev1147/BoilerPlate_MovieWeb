const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom:{
        type: Schema.Types.ObjectId,
        ref: 'User' //User에 모든 정보를 가져온다
    },
    movieId:{
        type:String
    },
    movieTitle:{
        type:String
    },
    moviePost:{
        type:String
    },
    movieRunTime:{
        type:String
    }
},{timestamps:true})


  



const Favorite = mongoose.model('Favorite',favoriteSchema)

module.exports = {Favorite}