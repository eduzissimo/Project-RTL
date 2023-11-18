import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se a página possui um h2 com o heading "Encountered Pokémon"', () => {
  renderWithRouter(<App />);
  const homeTitle = screen.getByRole('heading', { name: /Encountered pokémon/i });

  expect(homeTitle).toBeInTheDocument();
});

test('Verifica se é exibido o próximo Pokémon ao clicar no botão "Próximo pokémon"', async () => {
  const { user } = renderWithRouter(<App />);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

  const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
  await user.click(nextPokemon);

  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
  await user.click(nextPokemon);

  const caterpie = screen.getByText(/caterpie/i);
  expect(caterpie).toBeInTheDocument();
  await user.click(nextPokemon);

  const ekans = screen.getByText(/ekans/i);
  expect(ekans).toBeInTheDocument();
  await user.click(nextPokemon);

  const alakazam = screen.getByText(/alakazam/i);
  expect(alakazam).toBeInTheDocument();
  await user.click(nextPokemon);

  const mew = screen.getByText(/mew/i);
  expect(mew).toBeInTheDocument();
  await user.click(nextPokemon);

  const rapidash = screen.getByText(/rapidash/i);
  expect(rapidash).toBeInTheDocument();
  await user.click(nextPokemon);

  const snorlax = screen.getByText(/snorlax/i);
  expect(snorlax).toBeInTheDocument();
  await user.click(nextPokemon);

  const dragonair = screen.getByText(/dragonair/i);
  expect(dragonair).toBeInTheDocument();
  await user.click(nextPokemon);

  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Verifica se os botões de filtragem funcionam como esperado', async () => {
  const { user } = renderWithRouter(<App />);
  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterButtons).toHaveLength(7);

  const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(nextBtn).toBeInTheDocument();

  const allFilters = screen.getByRole('button', { name: /all/i });

  /* Elétrico */
  const buttonElectric = screen.getByRole('button', { name: /electric/i });
  await user.click(buttonElectric);
  const pikachu = screen.getByText(/pikachu/i);
  const electType = screen.getByTestId('pokemon-type');
  expect(pikachu).toBeInTheDocument();
  expect(nextBtn).toBeDisabled();
  expect(allFilters).toBeInTheDocument();
  expect(electType.textContent).toEqual(buttonElectric.textContent);

  /* Fogo */
  const buttonFire = screen.getByRole('button', { name: /fire/i });
  await user.click(buttonFire);
  const charmander = screen.getByText(/charmander/i);
  const fireType = screen.getByTestId('pokemon-type');
  expect(charmander).toBeInTheDocument();
  expect(nextBtn).toBeDisabled();
  expect(allFilters).toBeInTheDocument();
  expect(fireType.textContent).toEqual(buttonFire.textContent);

  await user.click(allFilters);
  expect(pikachu).toBeInTheDocument();
  expect(electType.textContent).toEqual(allFilters.textContent);
});
