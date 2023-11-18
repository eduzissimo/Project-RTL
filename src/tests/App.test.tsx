import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se no topo da aplicação contém links de navegação ', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});

test('Verifica se ao clicar no link Home é redirecionado para a página inicial', async () => {
  const { user } = renderWithRouter(<App />, { route: '/about' });

  const homePage = screen.getByRole('link', { name: /home/i });
  await user.click(homePage);

  const homeTitle = screen.getByText(/encountered pokémon/i);

  expect(homeTitle).toBeInTheDocument();
});

test('Verifica se ao clicar no link About é redirecionado para a página About', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });

  const aboutPage = screen.getByRole('link', { name: /about/i });
  await user.click(aboutPage);

  const aboutTitle = screen.getByText(/about pokédex/i);

  expect(aboutTitle).toBeInTheDocument();
});

test('Verifica se ao clickar no link "Favorite Pokémons", é redirecionado para /favorites', async () => {
  const { user } = renderWithRouter(<App />);
  const favoritePokemonsScenario = screen.getByRole('link', { name: /favorite pokémon/i });
  await user.click(favoritePokemonsScenario);

  const favoritePokemonsTitle = screen.getByRole('heading', { name: /favorite pokémon/i });
  expect(favoritePokemonsTitle).toBeInTheDocument();
});

test('Verifica se ao entrar em uma URL desconhecida, é redirecionado para a página "Not Found"', () => {
  renderWithRouter(<App />, { route: '/pagina-que-nao-existe' });
  const notFound = screen.getByRole('heading', { name: /not found/i });
  expect(notFound).toBeInTheDocument();
});
