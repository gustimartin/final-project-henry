const { Schema, model} = require('mongoose') 

const productSchema = new Schema({
    name : {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: Array,
        require: true
    },
    description: {
        type: String
    },
    stock: {
        type: Number,
        default: true
    },
    origin: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    enable: {
        type: Boolean,
        default: true
    }
})

module.exports = model('product', productSchema)