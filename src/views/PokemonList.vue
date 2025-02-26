<script setup>
import { computed, reactive, ref } from "vue";
import ModeSelector from "@/components/ModeSelector.vue";
import useGetEndpoint from "@/composables/useGetEndpoint";
import Loader from "@/components/Loader.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import PokemonCardView from "@/components/PokemonCardView.vue";
import PokemonPagination from "@/components/PokemonPagination.vue";
import PokemonTableView from "@/components/PokemonTableView.vue";
import { getQueryParam, updateQueryParam } from "@/utils/window";

const LIMIT = 10;
const total = ref(0);
const offset = ref(Number(getQueryParam("offset")) ?? 0);
const params = reactive({
  offset,
  limit: LIMIT,
});
const data = useGetEndpoint("pokemon", params);

const viewMode = ref("card");
const viewingElementsSpan = computed(() => {
  updateQueryParam("offset", offset.value);

  let totalViewing = null;
  if (data.value.response) {
    total.value = data.value.response.count;
    totalViewing = data.value.response.count;
  }

  return {
    viewing: offset.value + LIMIT,
    total: totalViewing,
  };
});

const showPrevious = computed(() => offset.value !== 0);
const showNext = computed(() => offset.value + LIMIT < total.value);
</script>

<template>
  <section class="w-full">
    <div class="flex flex-col md:flex-row md:items-end gap-3 justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-medium text-heading mt-3">Lista de Pokémon</h2>
        <p>
          Viendo {{ viewingElementsSpan.viewing }} de
          {{ viewingElementsSpan.total ?? "-" }} elementos
        </p>
      </div>
      <ModeSelector class="ml-auto" v-model="viewMode" />
    </div>
    <div class="w-full mt-3">
      <Loader v-if="data.isLoading" />
      <ErrorMessage v-if="data.error">
        {{ data.error }}
      </ErrorMessage>
      <div
        class="w-full space-y-6"
        v-if="data.response && !data.isLoading && !data.error"
      >
        <PokemonCardView
          v-if="viewMode === 'card'"
          :data="data.response.results"
        />
        <PokemonTableView
          v-if="viewMode === 'table'"
          :data="data.response.results"
        />
        <PokemonPagination
          @on-start="offset = 0"
          @on-previous="offset -= LIMIT"
          @on-next="offset += LIMIT"
          @on-end="offset = total - LIMIT"
          :show-previous="showPrevious"
          :show-next="showNext"
        />
      </div>
    </div>
  </section>
</template>
