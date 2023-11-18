import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se na página é exibido informações da Pokédex', () => {
  renderWithRouter(<App />, { route: '/about' });
  const aboutTitle = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });

  expect(aboutTitle).toBeInTheDocument();
});

test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<App />, { route: '/about' });
  const aboutPokedex = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon./i);
  const aboutPokedex2 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them./i);

  expect(aboutPokedex).toBeInTheDocument();
  expect(aboutPokedex2).toBeInTheDocument();
});

test('Verifica se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<App />, { route: '/about' });
  const pokedexImage = screen.getByAltText('Pokédex');
  const imgSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(pokedexImage).toHaveAttribute('src', imgSource);
});
