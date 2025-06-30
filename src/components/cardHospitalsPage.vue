
<template>
  <div v-if="hospital" class="bg-white p-4 rounded-lg shadow border m-auto">
    <h2 class="text-xl font-bold text-gray-800 mb-2">
      {{ hospital.NAME }}
    </h2>
    <p class="text-gray-600">📍 {{ hospital.ADDRESS }}</p>
    <p class="text-gray-500">
      Loại: {{ hospital.TYPE === "public" ? "Công" : "Tư" }}
    </p>
    <p class="mt-2 text-yellow-500">⭐ {{ hospital.RATING || 4.5 }}</p>
  </div>
  <div v-else class="text-gray-400 italic">
    Chọn một bệnh viện để xem chi tiết
  </div>
</template>

<script setup>
defineProps({
  hospital: {
    type: Object,
    default: null,
  },
});
</script>
