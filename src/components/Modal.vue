<template>
  <div class="relative">
    <div @click="isOpen = true">
      <slot name="trigger"></slot>
    </div>

    <div v-if="isOpen" class="absolute z-50 mt-2">
      <div class="fixed inset-0" @click="isOpen = false"></div>
      <div class="relative bg-white rounded-lg shadow-xl">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style scoped>
.absolute {
  position: absolute;
  right: 0;
  min-width: 200px;
}
</style>
