const mongoose = require("mongoose")
const { Schema } = mongoose;

//Schema for database with books
const bookSchema = new Schema(
    {
        title:{
            type:  String,
            required: true
        },
        author :{
            type:String,
            required:true
        },
        publishYear:{
            type:Number,
            required:true
        },
    },
    {
        timestamps: true,
})

//exporting a model of the schema
module.exports = mongoose.model("book", bookSchema);