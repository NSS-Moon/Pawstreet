import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pawstreet welcome screen', () => {
  render(<App />);
  expect(screen.getByText(/pawstreet/i)).toBeInTheDocument();
  expect(screen.getByText(/create your pet/i)).toBeInTheDocument();
});
