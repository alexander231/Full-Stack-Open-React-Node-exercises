const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        console.log(authorization.substring(7))
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response, next) => {

    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    console.log(blogs)
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {

    const body = request.body
    const user = request.user
    //const token = getTokenFrom(request)
    //const decodedToken = jwt.verify(token, process.env.SECRET)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !user.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userByToken = await User.findById(user.id)
    if(!body.title && !body.url) {
        return response.status(400).send('Title and URL are missing')
    }
    if (!body.likes)
        body.likes = 0

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: userByToken._id
    })

    const savedBlog = await blog.save()

    userByToken.blogs = userByToken.blogs.concat(savedBlog)

    await userByToken.save()

    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
   
    const id = request.params.id
    
    const user = request.user
    if(!request.token || !user.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(401).json({ error: 'that blog does not exist' })
    }
    if (user.id.toString() !== blog.user.toString()){
        return response.status(401).json({ error: 'blog can be deleted only by the user that created it' })
    }
    await Blog.findByIdAndRemove(id)

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {

    const id = request.params.id

    const newLikes = request.body.likes

    const cox = await Blog.findByIdAndUpdate(id, {likes: newLikes})
    console.log(cox)

    newBlog = await Blog.findById(id).populate('user', {name: 1, username: 1})

    console.log(newBlog)
    response.json(newBlog)
    
})
module.exports = blogsRouter