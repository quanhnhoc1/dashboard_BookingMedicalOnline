<!-- src/pages/medical-facility/private-hospital.vue -->
<template>
  <div class="text-blue-500">Đây là trang bệnh viện tư</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

onMounted(() => {
  searchStore.setTitlePage("Bệnh viện tư");
});
</script>
