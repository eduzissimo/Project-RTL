import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se na página é renderizado um card com as informações de deteminado Pokémon', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonImage = screen.getByRole('img');
  const imgSrc = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
  const imgSrcAlt = 'Pikachu sprite';

  expect(pokemonName.textContent).toEqual('Pikachu');
  expect(pokemonType.textContent).toEqual('Electric');
  expect(pokemonWeight.textContent).toEqual('Average weight: 6.0 kg');
  expect(pokemonImage).toHaveAttribute('src', imgSrc);
  expect(pokemonImage).toHaveAttribute('alt', imgSrcAlt);
});

test('Verifica se na página do Pokémon possui um link de navegação para exibir detalhes', async () => {
  const { user } = renderWithRouter(<App />);

  const detailsLink = screen.getByRole('link', { name: /more details/i });
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink).toHaveAttribute('href', '/pokemon/25');
  await user.click(detailsLink);
  expect(screen.getByText(/Summary/i)).toBeInTheDocument();
});

test('Verifica se existe um ícone de estrela nos pokémons favoritados', async () => {
  const { user } = renderWithRouter(<App />);

  const detailsLink = screen.getByRole('link', { name: /more details/i });
  await user.click(detailsLink);
  expect(window.location.pathname).toBe('/pokemon/25');
  expect(screen.getByText(/Summary/i)).toBeInTheDocument();

  const favoritePokemon = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  await user.click(favoritePokemon);

  const icon = screen.getByAltText('Pikachu is marked as favorite');
  expect(icon).toBeInTheDocument();
});
