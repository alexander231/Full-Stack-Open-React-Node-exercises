import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog  from './Blog'

describe('<Blog />', () => {
    let component
    const blog = {
        author: 'Colcegaa',
        title: 'el Croceag',
        likes: 10,
        URL: 433,
    }
    const likeHandler = jest.fn()
    beforeEach(() => {
        component = render(
        <Blog blog = {blog} updateBlog = {likeHandler}/>
        )
    })

    
    test('renders blog title', () => {
        
        expect(component.container).toHaveTextContent('el Croceag')

    })
    test('renders blog author', () => {
    
        expect(component.container).toHaveTextContent('Colcegaa')

    })
    
    test('does not render url or likes by default', () => {
        
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')

    })
    test('render URL and Likes after button is pressd', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')

    })
    test('if like is pressed twice then the event handler is called twice', () => {
        
        const button = component.getByText('Like')
       
        fireEvent.click(button)
        fireEvent.click(button)
       
        expect(likeHandler.mock.calls).toHaveLength(2)
        
    })
})

