import { render, screen } from '@testing-library/react';
import App from './App';

// Test to check if the "learn react" link is rendered
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Find the element with text "learn react"
  const linkElement = screen.getByText(/learn react/i);
  
  // Check if the element is in the document
  expect(linkElement).toBeInTheDocument();
});
