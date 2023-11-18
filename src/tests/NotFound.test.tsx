import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se a página possui o heading "Page requested not found"', () => {
  renderWithRouter(<App />, { route: '/pagina-que-nao-existe' });
  const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFound).toBeInTheDocument();
});

test('Verifica se a página exite o texto alternativo', () => {
  renderWithRouter(<App />, { route: '/pagina-que-nao-existe' });
  const notFound = screen.getByAltText(/Clefairy pushing buttons randomly with text I have no idea what i'm doing/i);
  const imgSource = '/404.gif';
  expect(notFound).toHaveAttribute('src', imgSource);
});
