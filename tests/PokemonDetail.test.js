// /**
//  * @vitest-environment happy-dom
//  */

import useGetEndpoint from "@/composables/useGetEndpoint";
import PokemonDetail from "@/views/PokemonDetail.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { computed } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

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

describe("PokemonDetail.vue", () => {
  it("shows loading state initially", async () => {
    useGetEndpoint.mockReturnValue({
      isLoading: true,
      response: null,
      error: null,
    });

    const wrapper = mount(PokemonDetail, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent({ name: "Loader" }).exists()).toBe(true);
  });

  it("renders data correctly if api is successful", async () => {
    useGetEndpoint.mockReturnValue(
      computed(() => ({
        isLoading: false,
        error: null,
        response: {
          name: "Pikachu",
          types: [{ type: { name: "electric" } }],
          species: { name: "Pikachu" },
          abilities: [
            {
              ability: { name: "static" },
              is_hidden: false,
            },
            {
              ability: { name: "lightning-rod" },
              is_hidden: true,
            },
          ],
        },
      }))
    );

    const wrapper = mount(PokemonDetail, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find("h2").text()).toBe("Pikachu");
    expect(wrapper.text()).toContain("electric");
    expect(wrapper.text()).toContain("static");
    expect(wrapper.text()).toContain("lightning-rod");
    expect(wrapper.text()).toContain("(Oculta)");
  });

  it("renders error message if api fails", async () => {
    useGetEndpoint.mockReturnValue({
      isLoading: false,
      response: null,
      error: "Failed to load data",
    });

    const wrapper = mount(PokemonDetail, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent({ name: "ErrorMessage" }).exists()).toBe(true);
    expect(wrapper.text()).toContain("Failed to load data");
  });
});
