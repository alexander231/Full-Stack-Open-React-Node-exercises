const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }).then(() => {
        console.log('connected to MongoDB')

    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })
const personSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        minLength: 8
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', personSchema)