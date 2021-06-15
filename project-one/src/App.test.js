import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders Blackjack option', () => {
  render(<App />);
  const linkElement = screen.getByText(/Blackjack/i);
  expect(linkElement).toBeInTheDocument();
});

// test(`URL contains /blackjack when Blackjack is selected`, () => {
//   render(<App />);
//   userEvent.click(screen.getByText('Blackjack'))
//   expect(window.location.pathname).toHaveTextContent('/blackjack')
// })


