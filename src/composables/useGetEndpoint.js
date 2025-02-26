import { createEndpointUrl } from "@/utils/api";
import axios from "axios";
import { computed, ref, watch } from "vue";

/**
 * Composable to fetch data from the .env API URL.
 * Automatically triggers if queryParams change.
 * @param {String} endpoint
 * @param {Object} queryParams
 * @returns - A computed ref containing the request state.
 */
export default function useGetEndpoint(endpoint, queryParams = {}) {
  const isLoading = ref(true);
  const error = ref(null);
  const response = ref(null);

  const makeRequest = () => {
    const endpointUrl = createEndpointUrl(endpoint, queryParams);
    isLoading.value = true;
    axios
      .get(endpointUrl)
      .then((axiosResponse) => {
        response.value = axiosResponse.data;
      })
      .catch((axiosError) => {
        error.value = axiosError.error;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  makeRequest();

  if (Object.keys(queryParams).length > 0) {
    watch(queryParams, () => makeRequest());
  }
  return computed(() => ({
    isLoading: isLoading.value,
    response: response.value,
    error: error.value,
  }));
}
