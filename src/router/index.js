import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "PokemonList",
    path: "/",
    component: () => import("@/views/PokemonList.vue"),
  },
  {
    name: "PokemonDetail",
    path: "/detail/:id",
    component: () => import("@/views/PokemonDetail.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
