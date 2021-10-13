const {
    request,
    response
} = require('express')
const ObjectID = require('mongodb').ObjectID
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
//app.use(requestLogger)
morgan.token('data', (request, response) => {

    return JSON.stringify(response.body);
})
app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.data(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms'
    ].join(' ')

}))

//app.use(unknownEndpoint)
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (request, response) => {
    console.log('cox')
    Person.find({}).then(persons => {
        response.json(persons)
    })

})
app.get('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person.find({
        _id: request.params.id
    }).then(person => {
        console.log(person)
        if (person[0]) {
            response.json(person)
        } else {
            response.status(404).end()
        }

    }).catch(error => next(error))
})
app.get('/info', (request, response) => {

    response.send(`<p>Phonebook has info for ${Person.length + 1} people</p>
                   <p>${new Date()}</p>`)

})
app.delete('/api/persons/:id', (request, response, next) => {

    Person.findOneAndDelete({
        _id: ObjectID(request.params.id)
    }).then(() => {
        response.status(204).end()
    }).catch(error => {
        next(error)
    })

})

app.post('/api/persons', (request, response, next) => {

    console.log(request.body)
    const newPerson = new Person({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber
    })
    newPerson.save().then((result) => {
        console.log('added', result.name)
        response.json(result)
    }).catch(error => next(error))


})
app.put('/api/persons/:id', (request, response, next) => {
    console.log(request.body)
    Person.findOneAndUpdate({
        _id: ObjectID(request.params.id)
    }, {
        name: request.body.name,
        phoneNumber: request.body.phoneNumber
    }, {
        new: true
    }).then((result) => {
        console.log(result)
        response.json(result)
    }).catch(error => next(error))

})
const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({
            error: 'Name must be unique and at least 3 characters, phoneNumber must be unique and at least 8 characters'
        })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})