<script setup lang="ts">
import IconArrowLeftToLine from "./icons/IconArrowLeftToLine.vue";
import IconArrowLeft from "./icons/IconArrowLeft.vue";
import IconArrowRightToLine from "./icons/IconArrowRightToLine.vue";
import IconArrowRight from "./icons/IconArrowRight.vue";

defineProps({
  showPrevious: {
    type: Boolean,
    required: true,
  },
  showNext: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["onStart", "onPrevious", "onNext", "onEnd"]);
</script>

<template>
  <div class="flex justify-between gap-1.5 mx-1.5">
    <div
      class="flex items-center gap-1.5 text-heading"
      :class="{
        'opacity-30 pointer-events-none !cursor-not-allowed': !showPrevious,
      }"
    >
      <button @click="$emit('onStart')" class="cursor-pointer">
        <IconArrowLeftToLine class="size-4" />
      </button>
      <button
        @click="$emit('onPrevious')"
        class="flex items-center gap-1.5 ml-3 cursor-pointer"
      >
        <IconArrowLeft class="size-4" />
        <span class="text-sm">Anterior</span>
      </button>
    </div>
    <div
      class="flex items-center gap-1.5 text-heading"
      :class="{
        'opacity-30 pointer-events-none !cursor-not-allowed': !showNext,
      }"
    >
      <button
        @click="$emit('onNext')"
        class="flex items-center gap-1.5 mr-3 cursor-pointer"
      >
        <span class="text-sm">Siguiente</span>
        <IconArrowRight class="size-4" />
      </button>
      <button @click="$emit('onEnd')" class="cursor-pointer">
        <IconArrowRightToLine class="size-4" />
      </button>
    </div>
  </div>
</template>
