
const mongoose= require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    model : {
        type : String
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },

    expireDate : {
        type : String,
        required : true
    },
    active : {
        default : true,
        type  : Boolean,
        required : true
    },
    vendor : {
        type : String,
        required : true
    },
    address : {
        type : String

    },
    contact : {
        type : Number,
        minLength : 10,
        maxLength : 10
    }

}, {timestamps : true})

const ProductModel = mongoose.model("ProductDetail" , productSchema)
module.exports = ProductModel