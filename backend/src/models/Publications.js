const { Schema, model} = require('mongoose') 

const publicationsSchema = new Schema({
 
    description: {
        type: String
    },
    score: {
        type: Number,
        default: true
    }
    
})

module.exports = model('publications', publicationsSchema)