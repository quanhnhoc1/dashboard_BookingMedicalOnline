<template>
  <div>
    <div class="flex max-w-[1170px] mx-auto my-4">
      <span class="text-bold text-gray-900 font-bold"
        >Trang chủ >
        <span class="text-[#00b5f1] text-m">
          {{ searchStore.titlePage }}
        </span></span
      >
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
</script>

<style lang="scss" scoped></style>
