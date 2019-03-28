const mongoose = require("mongoose");
const  mongoosePaginate = require('mongoose-paginate');


const postSchema = new mongoose.Schema({
    
    title : String,
    image : {
        url : String,
        public_id : String
    },
    description : String
})

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema)