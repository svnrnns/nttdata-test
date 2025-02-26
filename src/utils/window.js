/**
 * Updates a query parameter in the URL without reloading the page.
 * If the parameter already exists, it will be updated. Otherwise, it will be added.
 *
 * @param {string} key - The query parameter key.
 * @param {string} value - The value to set for the query parameter.
 */
export function updateQueryParam(key, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
}

/**
 * Retrieves a query parameter value from the URL.
 *
 * @param {string} key - The query parameter key to retrieve.
 * @returns {string|null} - The value of the query parameter, or null if not found.
 */
export function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}
