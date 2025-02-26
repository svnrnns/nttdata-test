/**
 * Creates a full API URL based on a given endpoint and query params.
 * Ensures there is exactly one `/` between strings.
 * @param {String} endpoint
 * @param {Object} [params]
 * @returns {String}
 */
export function createEndpointUrl(endpoint, params = {}) {
  const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
  const sanitizedEndpoint = endpoint.replace(/^\/+/, "");
  const url = new URL(`${baseUrl}/${sanitizedEndpoint}`);

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  return url.toString();
}
