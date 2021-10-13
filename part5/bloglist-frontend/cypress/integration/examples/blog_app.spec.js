import { element, func, object } from "prop-types"

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Alexander Ree',
        username: 'alexander',
        password: 'parola'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })

    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('alexander')
        cy.get('#password').type('parola')
        cy.get('#login-button').click()
        cy.contains('logged in')
        cy.contains('logout')
        cy.contains('create new blog')

      })
      it('fails with wrong credentials', function() {
        cy.get('#username').type('alexanderss')
        cy.get('#password').type('parolass')
        cy.get('#login-button').click()
        cy.contains('login')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.error').contains('Wrong credentials')
        cy.get('html').should('not.contain', 'Alexander Ree logged in')
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'alexander', password: 'parola'})
        cy.createBlog({ title: 'Orceagu', author: 'Ando', url: 'www.ando.com' })
        // log in user here
      })
  
      it('A blog can be created', function() {
        // ...
        // cy.get('#create-new-blog').click()
        // cy.get('#title').type('ceaga')
        // cy.get('#author').type('Colceag')
        // cy.get('#URL').type('www.ceaga.com')
        // cy.get('#save').click()
        cy.createBlog({ title: 'ceaga', author: 'Colceag', url: 'www.ceaga.com' })
        cy.get('.blog').should('contain', 'ceaga')
        cy.get('.blog').should('contain', 'Colceag')
        cy.get('.blog').should('contain', 'www.ceaga.com')
      })
      it('User can like a blog', function() {
        cy.get('#view').click()
        cy.contains('Likes: 0').contains('Like').click()
        cy.contains('Likes: 1')
      })
      it('User can delete blog created by him', function() {
        
        cy.deleteBlog()
        
      })
      it('User can not delete a blog which is not created by him', function() {
        const user1 = {
          name: 'Colceag',
          username: 'ceaga',
          password: 'cox'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user1)
        cy.login({ username: 'ceaga', password: 'cox'})
        cy.deleteBlogFail()

      })

      it.only('blogs are ordered according o likes', function() {
        cy.createBlog({ title: 'Andu', author: 'Abri', url: 'www.abri.com', likes: '10' })
        cy.createBlog({ title: 'Coxul', author: 'Cox', url: 'www.cox.com', likes: '2' })
        cy.createBlog({ title: 'Colceag', author: 'Mede', url: 'www.mede.com', likes: '4' })
        cy.get('.blog').then( blogs => {
          cy.wrap(blogs[0]).should('contain', '10')
          const objects = Object.entries(blogs).map((element, index) => isNaN(Number(element[0])) ? null : element[1] )
          const blogDivs = objects.filter(object => object !== null)
          
          const likes = blogDivs.map(blogDiv => Number(blogDiv.textContent.substring(blogDiv.textContent.indexOf('Likes: ') + 'Likes: '.length, blogDiv.textContent.indexOf(' Like'))))
          const sortedLikes = likes.sort((a, b) => b - a)
          if (likes === sortedLikes)
            console.log('e ok')
          
        })
      })
        
      
    })
  })