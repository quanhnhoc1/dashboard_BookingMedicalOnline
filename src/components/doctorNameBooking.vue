<template>
  <div v-if="selectedDoctor" class="flex items-start gap-3">
    <i
      class="fas fa-stethoscope text-gray-500 text-base mt-0.5 flex-shrink-0"></i>
    <div class="flex-1">
      <span class="text-gray-500 font-medium text-sm md:text-base"
        >Tên bác sĩ:</span
      >
      <span class="text-gray-700 text-sm md:text-base ml-2">
        {{ selectedDoctor.FULL_NAME }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { computed } from "vue";
const hospitalsStore = userHospitalsStore();
const selectedDoctor = computed(() => hospitalsStore.selectedDoctor);
</script>

<style scoped></style>
