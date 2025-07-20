<template>
  <div v-if="selectedDoctor" class="flex items-start gap-3">
    <i class="fas fa-user-md text-gray-500 text-xl mb-3"></i>
    <div class="flex-1">
      <span class="text-gray-500 font-medium text-sm md:text-base"
        >Tên bác sĩ:</span
      >
      <span class="text-gray-700 text-sm md:text-base ml-2">
        {{ selectedDoctor.DOCTOR_NAME }}
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
