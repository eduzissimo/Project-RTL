import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachuData = '/pokemon/25';
const snorlaxData = '/pokemon/143';

test('Verifica se as informações detalhadas do pokémon são mostradas na tela', () => {
  renderWithRouter(<App />, { route: pikachuData });

  const pokeName = screen.getByRole('heading', { level: 2, name: /pikachu details/i });
  const pokeLink = screen.queryByRole('link', { name: /more details/i });
  const summaryTitle = screen.getByRole('heading', { level: 2, name: /summary/i });
  const pokeSummary = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');

  expect(pokeName).toBeInTheDocument();
  expect(pokeLink).not.toBeInTheDocument();
  expect(summaryTitle).toBeInTheDocument();
  expect(pokeSummary).toBeInTheDocument();
});

test('Verifica se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
  renderWithRouter(<App />, { route: snorlaxData });

  const mapLocationURL = 'https://archives.bulbagarden.net/media/upload/5/54/Kanto_Vermilion_City_Map.png';
  const mapLocationTitle = screen.getByRole('heading', { level: 2, name: /game locations of snorlax/i });
  const mapLocation = screen.getByText(/kanto vermillion city/i);
  const snorlaxLoc = screen.getByRole('img', { name: /snorlax location/i });

  expect(mapLocationTitle).toBeInTheDocument();
  expect(mapLocation).toBeInTheDocument();
  expect(snorlaxLoc).toBeInTheDocument();
  expect(snorlaxLoc).toHaveAttribute('src', mapLocationURL);
});

test('Verifica se por meio da página de detalhes é possível favoritar um Pokémon', async () => {
  const { user } = renderWithRouter(<App />, { route: snorlaxData });

  const favButton = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  const favMenu = screen.getByRole('link', { name: /favorite pokémon/i });
  expect(favButton).toBeInTheDocument();

  await user.click(favButton);
  await user.click(favMenu);

  const snorlax = screen.queryByText(/snorlax/i);
  expect(snorlax).toBeInTheDocument();

  const moreDetails = screen.getByRole('link', { name: /more details/i });
  await user.click(moreDetails);
  await user.click(favButton);
  await user.click(favMenu);
});
