<template>
  <div class="flex flex-col min-h-screen">
    <Header>
      <template #iconHeadPhone>
        <i class="fas fa-headset text-red-500 text-lg"></i>
      </template>
      <template #phoneNumberCall>
        <p class="text-xs">Hỗ trợ đặt khám</p>
        <p class="text-orange-500 font-semibold text-lg">1900 2115</p>
      </template>
    </Header>
    <main class="flex-1 mt-[110px]">
      <banner />
    </main>
    <serviceMenuItems />
  </div>
</template>

<script setup>
import Header from "@/components/composables/header.vue";
import banner from "@/components/composables/banner.vue";
import serviceMenuItems from "@/components/composables/serviceMenuItems.vue";
import { onMounted, onUnmounted, ref } from "vue";
</script>

<style scoped>
.flex > :first-child {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
</style>
