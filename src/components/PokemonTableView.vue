<script setup>
import { getQueryParam } from "@/utils/window";
import IconArrowRight from "./icons/IconArrowRight.vue";
import {
  extractPokemonIdFromUrl,
  getPokemonIconUrl,
} from "@/utils/pokemon-avatars";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="w-full ring-1 ring-detail rounded-lg flex flex-col divide-y divide-detail shadow"
  >
    <!-- Headers -->
    <div class="flex p-1.5 gap-1.5">
      <div class="w-[10%] sm:w-[5%]"></div>
      <span class="w-full">Nombre</span>
    </div>
    <!-- Table -->
    <RouterLink
      class="flex p-1.5 gap-1.5 items-center cursor-pointer hover:bg-module transition-all"
      v-for="element in data"
      :key="element.name"
      :to="{
        name: 'PokemonDetail',
        params: { id: extractPokemonIdFromUrl(element.url) },
        query: { offset: getQueryParam('offset') },
      }"
    >
      <div class="w-[10%] sm:w-[5%] aspect-square">
        <img
          :src="getPokemonIconUrl(element.url)"
          :alt="`${element.name}-icon`"
          class="size-full scale-75"
          draggable="false"
        />
      </div>
      <span class="flex-1 text-heading capitalize">
        {{ element.name }}
      </span>
      <div class="flex items-center gap-1 mr-1.5">
        <span class="text-xs">Ver detalles</span>
        <IconArrowRight class="size-3 text-font" />
      </div>
    </RouterLink>
  </div>
</template>
