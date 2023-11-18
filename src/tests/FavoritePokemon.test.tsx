import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se na ausência de pokémons favoritos é exibida a mensagem "No favorite pokemon found', () => {
  renderWithRouter(<App />, { route: '/favorites' });
  const noFavoritePokemons = screen.getByText(/no favorite pokémon found/i);
  expect(noFavoritePokemons).toBeInTheDocument();
});

test('Verifica se os cards com os pokémons favoritados são exibidos na tela', async () => {
  const { user } = renderWithRouter(<App />);

  const pokemonsDetails = screen.getByRole('link', { name: /more details/i });
  await user.click(pokemonsDetails);

  const favPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  await user.click(favPokemon);

  const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await user.click(favoritePokemonLink);

  const pikachuData = screen.getByText(/pikachu/i);
  expect(pikachuData).toBeInTheDocument();
});
