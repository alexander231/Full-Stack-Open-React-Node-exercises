import React from 'react'
import blogs from '../services/blogs'
import Togglable from './Togglable'
const Blog = ({blog, updateBlog, user, deleteBlog}) => {

  const likeBlog = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)

  }
  const showUser = () => {
    if ( blog.user == null ) return 
      return (
        <div>
          User: {blog.user.username} {blog.user.name}
        </div>
      )
  }
  const removeBlog = () => {
    deleteBlog(blog)

  }
  const removeButton = () => {
    if ( blog.user != null && blog.user.username === user.username )  
    return (
      <button type = "button" onClick = {removeBlog}>
          remove
      </button>
    )
  }
  return (
    <div className ='blog'>
    Title: {blog.title} Author: {blog.author} Id: {blog.id}
    <Togglable buttonLabel = "view" id1 = 'view'>
      Likes: {blog.likes} <button id = 'like' type = "button" onClick = {likeBlog} >Like</button>
      
      <br/>
      URL: {blog.url}
      <br/>
      {showUser()}
      {removeButton()}
      
    </Togglable>
  </div>  
  )
  

    
 
}

export default Blog