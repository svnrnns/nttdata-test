<script setup>
import { RouterLink } from "vue-router";
import IconArrowRight from "./icons/IconArrowRight.vue";
import {
  extractPokemonIdFromUrl,
  getPokemonSpriteUrl,
} from "@/utils/pokemon-avatars";
import { getQueryParam } from "@/utils/window";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="w-full dynamic-grid gap-3">
    <RouterLink
      class="w-full flex flex-col ring-1 ring-detail shadow rounded-lg p-1.5 cursor-pointer hover:ring-font/30 transition-all"
      v-for="element in data"
      :key="element.name"
      :to="{
        name: 'PokemonDetail',
        params: { id: extractPokemonIdFromUrl(element.url) },
        query: { offset: getQueryParam('offset') },
      }"
    >
      <div class="w-full bg-module rounded-lg aspect-square">
        <img
          :src="getPokemonSpriteUrl(element.url)"
          :alt="`${element.name}-sprite`"
          class="size-full scale-75"
          draggable="false"
        />
      </div>
      <span class="font-medium text-sm text-heading capitalize ml-1.5 mt-1.5">
        {{ element.name }}
      </span>
      <div class="flex items-center gap-1 ml-1.5">
        <span class="text-xs">Ver detalles</span>
        <IconArrowRight class="size-3 text-font" />
      </div>
    </RouterLink>
  </div>
</template>
