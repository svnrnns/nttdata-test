/**
 * Extracts the Pokemon ID from an API URL
 * @param {String} apiUrl
 * @returns - The ID
 */
export function extractPokemonIdFromUrl(apiUrl) {
  const parts = apiUrl.split("/").filter(Boolean);
  return parts[parts.length - 1];
}
/**
 * Returns a Pokemon Sprite URL based on a PokeApi Pokemon URL
 * @param {string} apiUrl
 * @returns - The Sprite URL
 */
export function getPokemonSpriteUrl(apiUrl) {
  const pokemonId = extractPokemonIdFromUrl(apiUrl);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

/**
 * Returns a Pokemon Icon URL based on a PokeApi Pokemon URL
 * @param {string} apiUrl
 * @returns - The Icon URL
 */
export function getPokemonIconUrl(apiUrl) {
  const pokemonId = extractPokemonIdFromUrl(apiUrl);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemonId}.png`;
}
