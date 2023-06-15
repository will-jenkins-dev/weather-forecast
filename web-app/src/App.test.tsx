import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders', async () => {
    render(<App />)
    const titleElement = await screen.findByText(/Daily\/Weekly Forecast for/i)
    expect(titleElement).toBeInTheDocument()
})
