const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response, next) => {

    const users = await User.find({}).populate('blogs', {title: 1, url: 1, author: 1, likes: 1})

    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {

    body = request.body
    if (body.password.length < 3)
        return response.status(400).send('password length must be at least 3')
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

usersRouter.delete('/:id', async (request, response, next) => {
   
    const id = request.params.id
   
    await Blog.findByIdAndRemove(id)

    response.status(204).end()
})

usersRouter.put('/:id', async (request, response, next) => {

    const id = request.params.id

    const newLikes = request.body.likes

    await Blog.findByIdAndUpdate(id, {likes: newLikes})

    newBlog = await Blog.findById(id)

    response.json(newBlog)
    
})
module.exports = usersRouter