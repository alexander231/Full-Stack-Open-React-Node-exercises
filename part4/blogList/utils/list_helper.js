const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs) => {
    return blogs.length === 0 
    ? 0 
    :  blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0)
} 
const favoriteBlog = (blogs) => {

    return blogs.length === 0
    ? 'no blogs'
    : blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)

}

const mostBlogs = (blogs) => {
   
    if (blogs.length === 0) return 'no blogs'

    if (blogs.length === 1) return {author: blogs[0].author, blogs: 1}

    const frequencyBlogs = new Map()
    
    blogs.forEach(blog => frequencyBlogs.has(blog.author) ? frequencyBlogs.set(blog.author, frequencyBlogs.get(blog.author) + 1) : frequencyBlogs.set(blog.author, 1))
    
    const authorMaxBlogs = [...frequencyBlogs.entries()].reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)

    return {author: authorMaxBlogs[0], blogs: authorMaxBlogs[1]}
    
}
const mostLikes = (blogs) => {

  if (blogs.length === 0) return 'no blogs'

  if (blogs.length === 1) return {author: blogs[0].author, likes: blogs[0].likes}

  const frequencyBlogs = new Map()

  blogs.forEach(blog => frequencyBlogs.has(blog.author) ? frequencyBlogs.set(blog.author, frequencyBlogs.get(blog.author) + blog.likes) : frequencyBlogs.set(blog.author, blog.likes))
  
  const authorMaxLikes = [...frequencyBlogs.entries()].reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)
  
  return {author: authorMaxLikes[0], likes: authorMaxLikes[1]}

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}