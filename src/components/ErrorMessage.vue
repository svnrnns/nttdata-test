<script setup>
import IconCircleExclamation from "./icons/IconCircleExclamation.vue";
</script>

<template>
  <div class="flex items-center gap-1.5">
    <IconCircleExclamation class="size-4 text-danger" />
    <span class="text-sm font-medium text-danger">
      <slot />
    </span>
  </div>
</template>
