import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [addedBlogMessage, setAddedBlogMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const BlogFormRef = useRef()

  useEffect(() => {
   
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      
    })  
  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {

      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    try {

      BlogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create({title: newTitle, author: newAuthor, url: newURL})
      setBlogs(blogs.concat(newBlog))
      setAddedBlogMessage(`${newTitle} was added successfully , author: ${newAuthor}`)
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
      setTimeout(() => {
        setAddedBlogMessage(null)
      }, 5000)

      
    }
    catch (exception) {
      setErrorMessage('The blog could not be added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if ( window.confirm(`Delete ${blogToDelete.title} ?`)) {
      await blogService.remove(blogToDelete)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setAddedBlogMessage(`${blogToDelete.title} was removed successfully`)
      setErrorMessage(null)
      setTimeout(() => {
        setAddedBlogMessage(null)
      }, 5000)
      }
      
    }
    catch(exception) {
      setErrorMessage(`Can't delete blog ${blogToDelete.title}`)
      setAddedBlogMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      console.log(blogToUpdate)
      const updatedBlog = await blogService.update(blogToUpdate)
      console.log(updatedBlog)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      
      setAddedBlogMessage(`Blog ${updatedBlog.title} was successfully updated`)
      setErrorMessage(null)
      setTimeout(() => {
        setAddedBlogMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('The user can not like the blog')
      setAddedBlogMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handPasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleNewTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleNewURLChange = event => {
    setNewURL(event.target.value)
  }
  const byLikes = (b1, b2) => b2.likes - b1.likes


  console.log(user)
  

  return (
    
    <div>

      <Notification message = {errorMessage} type = 'error'/>
      <Notification message = {addedBlogMessage} type = 'addedBlog'/>

      {user === null ? 
      <LoginForm 
        handleLogin = {handleLogin} 
        handleUsernameChange = {handleUsernameChange} 
        handlePasswordChange = {handPasswordChange} 
        username = {username} 
        password = {password} 
      /> :
      <div>
        <p>{user.name} logged in  
          <button 
            type ="button" 
            onClick = {handleLogOut}> 
            logout 
          </button></p>
      <Togglable buttonLabel = 'create new blog' ref = {BlogFormRef} id1 = 'create-new-blog' id2 = 'hide'>
        <BlogForm 
          addBlog = {addBlog} 
          handleNewTitleChange = {handleNewTitleChange} 
          handleNewAuthorChange = {handleNewAuthorChange} 
          handleNewURLChange = {handleNewURLChange} 
          newTitle = {newTitle} 
          newAuthor = {newAuthor} 
          newURL = {newURL} 
          blogs = {blogs}
        />
      </Togglable>
          
    <ul>
      {
      blogs.sort(byLikes).map(blog => 
      <Blog 
      key = {blog.id}
      blog = {blog}
      updateBlog = {updateBlog}
      deleteBlog = {deleteBlog}
      user = {user}
      /> )}

    </ul>
      </div>
     
      } 
    </div>

  )
}

export default App