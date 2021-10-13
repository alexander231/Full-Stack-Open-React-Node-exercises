const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('Please follow the syntax: node mongo.js <password> <name> <phoneNumber>')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const phoneNumber = process.argv[4]

const url =
    `mongodb://fullstack:${password}@cluster0-shard-00-00.qewqc.mongodb.net:27017,cluster0-shard-00-01.qewqc.mongodb.net:27017,cluster0-shard-00-02.qewqc.mongodb.net:27017/phonebook-app?ssl=true&replicaSet=atlas-i4u8qu-shard-0&authSource=admin&retryWrites=true&w=majority`

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
    name: String,
    phoneNumber: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

    const person = new Person({
        name: name,
        phoneNumber: Number(phoneNumber)
    })

    person.save().then(result => {
        console.log('added', name, 'number', phoneNumber, 'to phonebook')
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {

    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}