// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        console.log(body)
        console.log(JSON.stringify(body))
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes}) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: {
            title,
            author,
            url,
            likes 
        },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` 
        }
    }).then(({ body }) => {
        localStorage.setItem('blogId', JSON.stringify(body.id))
        
        cy.visit('http://localhost:3000')
    })
    
})
Cypress.Commands.add('deleteBlog', () => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:3003/api/blogs/${JSON.parse(localStorage.getItem('blogId'))}`,
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` 
        },
    })
    cy.visit('http://localhost:3000')
})
Cypress.Commands.add('deleteBlogFail', () => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:3003/api/blogs/${JSON.parse(localStorage.getItem('blogId'))}`,
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` 
        },
        failOnStatusCode: false
    }).then( (res) => {
        expect(res.status).to.eq(401)
        
    })
    cy.visit('http://localhost:3000')
})

