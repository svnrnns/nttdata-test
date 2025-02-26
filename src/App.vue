<script setup>
import IconArrowRight from "./components/icons/IconArrowRight.vue";
</script>

<template>
  <main class="w-full p-[5%] lg:p-20">
    <div class="flex flex-col gap-1 mx-auto w-full max-w-3xl">
      <a
        href="https://www.github.com/svnrnns/nttdata-test"
        target="_blank"
        class="flex items-center gap-1.5 mb-10 text-heading cursor-pointer"
      >
        <span class="font-medium">Ir al repositorio</span>
        <IconArrowRight class="size-4" />
      </a>
      <RouterView />
    </div>
  </main>
</template>
