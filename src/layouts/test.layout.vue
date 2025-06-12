<template>
  <Header>
    <template #iconHeadPhone>
      <i class="fas fa-headset text-red-500 text-lg"></i>
    </template>
    <template #phoneNumberCall>
      <p class="text-xs">Hỗ trợ đặt khám</p>
      <p class="text-orange-500 font-semibold text-lg">1900 2115</p>
    </template>
  </Header>
</template>

<script setup>
import Header from "@/components/header.vue";
import { onMounted, onUnmounted, ref } from "vue";
</script>

<style scoped></style>
