import React from 'react'
import Blog from './Blog'
const BlogForm = ({addBlog, handleNewTitleChange, handleNewAuthorChange, handleNewURLChange,  newTitle, newAuthor, newURL}) => (
    <div>
        
    <form onSubmit = {addBlog}>
      Title:
      <input
        id = 'title'
        value = {newTitle}
        onChange = {handleNewTitleChange} 
      />
      <br></br>
      Author: 
      <input
        id = 'author'
        value = {newAuthor}
        onChange = {handleNewAuthorChange}
      />
      <br></br>
      URL:
      <input
        id = 'URL'
        value = {newURL}
        onChange = {handleNewURLChange}
      />
      <br></br>
      <button type = "submit" id = 'save'>save</button>
        
    </form>

    </div>
)

export default BlogForm