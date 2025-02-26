<script setup>
import ErrorMessage from "@/components/ErrorMessage.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import Loader from "@/components/Loader.vue";
import useGetEndpoint from "@/composables/useGetEndpoint";
import { createEndpointUrl } from "@/utils/api";
import { getPokemonSpriteUrl } from "@/utils/pokemon-avatars";
import { useRoute } from "vue-router";

const route = useRoute();
const endpoint = `pokemon/${route.params.id}`;

const data = useGetEndpoint(endpoint);
</script>

<template>
  <section class="w-full">
    <Loader v-if="data.isLoading" />
    <ErrorMessage v-if="data.error">
      {{ data.error }}
    </ErrorMessage>
    <div v-if="data.response" class="w-full space-y-3">
      <RouterLink
        class="flex items-center gap-1.5 mt-3"
        :to="{ name: 'PokemonList', query: route.query }"
      >
        <IconArrowLeft class="size-4" />
        <span>Volver a la lista</span>
      </RouterLink>
      <h2 class="text-2xl font-medium text-heading capitalize">
        {{ data.response.name }}
      </h2>
      <div
        class="w-full ring-1 ring-detail rounded-lg shadow flex flex-col md:flex-row gap-6 p-1.5 md:divide-x divide-detail"
      >
        <div class="size-32 rounded-lg p-1 bg-module">
          <img
            :src="getPokemonSpriteUrl(createEndpointUrl(endpoint))"
            :alt="`${data.response.name}-sprite`"
            class="size-full"
            draggable="false"
          />
        </div>
        <div class="flex flex-col flex-1">
          <span class="text-lg font-medium text-heading mb-3">Tipo(s)</span>
          <span
            class="capitalize"
            v-for="type in data.response.types"
            :key="type.type.name"
          >
            {{ type.type.name }}
          </span>
        </div>
        <div class="flex flex-col flex-1">
          <span class="text-lg font-medium text-heading mb-3">Especie</span>
          <span class="capitalize">
            {{ data.response.species.name }}
          </span>
        </div>
        <div class="flex flex-col flex-1">
          <span class="text-lg font-medium text-heading mb-3">Habilidades</span>
          <span
            class="capitalize"
            v-for="ability in data.response.abilities"
            :key="ability.ability.name"
          >
            <span>
              {{ ability.ability.name }}
            </span>
            <span
              v-if="ability.is_hidden"
              class="text-xs text-indigo-500 font-medium ml-1.5"
            >
              (Oculta)
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
