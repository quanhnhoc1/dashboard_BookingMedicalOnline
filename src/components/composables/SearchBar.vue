<template>
  <div class="w-full">
    <div class="w-full max-w-2xl mx-auto">
      <form class="relative">
        <input
          type="text"
          :placeholder="searchStore.searchPlaceholder"
          class="w-full pl-10 pr-10 p-2 rounded-lg border border-gray-300 text-sm hover:border-sky-400 focus:outline-none focus:border-sky-500 transition-colors" />
        <div class="absolute inset-y-0 left-2 flex items-center text-gray-500">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </form>
    </div>
    <slot name="textIntro"></slot>
  </div>
</template>

<script setup>
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
</script>
