// /**
//  * @vitest-environment happy-dom
//  */

import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import PokemonList from "@/views/PokemonList.vue";
import useGetEndpoint from "@/composables/useGetEndpoint";
import { computed } from "vue";
import { expect } from "vitest";

vi.mock("@/composables/useGetEndpoint", () => ({
  default: vi.fn(),
}));

const routes = [
  { path: "/", name: "PokemonList" },
  { path: "/pokemon/:id", name: "PokemonDetail" },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe("PokemonList.vue", () => {
  it("shows loading state initially", async () => {
    useGetEndpoint.mockReturnValue(
      computed(() => ({
        isLoading: true,
        response: null,
        error: null,
      }))
    );

    const wrapper = mount(PokemonList, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent({ name: "Loader" }).exists()).toBe(true);
  });

  it("renders data correctly if api is succesful", async () => {
    useGetEndpoint.mockReturnValue(
      computed(() => ({
        isLoading: false,
        response: {
          count: 50,
          results: [
            { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
            { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
          ],
        },
        error: null,
      }))
    );

    const wrapper = mount(PokemonList, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("Lista de Pokémon");
    expect(wrapper.text()).toContain("Viendo 10 de 50 elementos");
    expect(wrapper.text()).toContain("Pikachu");
    expect(wrapper.text()).toContain("Charmander");
  });

  it("renders error message if api fails", async () => {
    useGetEndpoint.mockReturnValue(
      computed(() => ({
        isLoading: false,
        response: null,
        error: "Error fetching data",
      }))
    );

    const wrapper = mount(PokemonList, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain("Error fetching data");
  });
});
