<script setup>
defineProps({
  modelValue: {
    required: true,
    type: String,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div
    class="flex items-center gap-1.5 p-1.5 rounded-lg ring-1 ring-detail shadow w-fit"
  >
    <button
      class="text-sm py-1.5 px-2.5 rounded select-none leading-none cursor-pointer"
      :class="{ 'bg-module': modelValue === 'card' }"
      @click="$emit('update:modelValue', 'card')"
    >
      Tarjeta
    </button>
    <button
      class="text-sm py-1.5 px-2.5 rounded select-none leading-none cursor-pointer"
      :class="{ 'bg-module': modelValue === 'table' }"
      @click="$emit('update:modelValue', 'table')"
    >
      Tabla
    </button>
  </div>
</template>
