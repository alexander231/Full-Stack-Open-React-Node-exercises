import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
 
    test('BlogForm calls the event handler when a new blog is created', () => {
        const authorHandler = jest.fn()
        const titleHandler = jest.fn()
        const urlHandler = jest.fn()
        const component = render(
            <BlogForm newAuthor = {'Croceag'} newTitle={'Ceaga'} newURL = {'www.com'} handleNewTitleChange = {titleHandler} handleNewAuthorChange = {authorHandler} handleNewURLChange =  {urlHandler}/>
            )
        const inputTitle = component.container.querySelector('#title')
        const inputAuthor = component.container.querySelector('#author')
        const inputURL = component.container.querySelector('#URL')

        const form = component.container.querySelector('form')

        fireEvent.change(inputTitle, { 
            target: { value: 'CeagaModified' }
        })
        fireEvent.change(inputAuthor, { 
            target: { value: 'CroceagModified' }
        })
        fireEvent.change(inputURL, { 
            target: { value: 'www.comModified' }
        })
        
        fireEvent.submit(form)
       

        expect(titleHandler.mock.calls).toHaveLength(1)
        expect(authorHandler.mock.calls).toHaveLength(1)
        expect(urlHandler.mock.calls).toHaveLength(1)
    
        // expect(authorHandler.mock.calls[0][0].content).toBe('CroceagModified')
        // expect(URL.mock.calls[0][0].content).toBe('www.comModified')

    })

})

