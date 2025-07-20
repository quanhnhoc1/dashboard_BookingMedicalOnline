<template>
  <div
    class="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-md bg-white">
    <!-- <div class="w-full rounded-xl shadow-lg bg-white border border-gray-100"> -->
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm md:text-base font-semibold px-4 py-3 rounded-t-xl">
      Thông tin cơ sở y tế
    </div>

    <!-- Nội dung -->
    <div class="p-4 md:p-6 space-y-3 md:space-y-4">
      <!-- Tên bệnh viện -->
      <div class="flex items-start gap-3">
        <i
          class="fas fa-hospital text-cyan-600 text-lg mt-0.5 flex-shrink-0"></i>
        <div class="flex-1">
          <span
            class="font-semibold text-gray-800 text-sm md:text-base leading-relaxed">
            {{ hospital.NAME }}
            <i class="fas fa-circle-check text-blue-500 ml-2 text-sm"></i>
          </span>
        </div>
      </div>

      <!-- Địa chỉ -->
      <div class="flex items-start gap-3">
        <i
          class="fas fa-map-marker-alt text-gray-500 text-base mt-0.5 flex-shrink-0"></i>
        <div class="flex-1">
          <span class="text-gray-500 font-medium text-sm md:text-base"
            >Địa chỉ:</span
          >
          <span class="text-gray-700 text-sm md:text-base ml-2">
            {{ hospital.ADDRESS }}
          </span>
        </div>
      </div>

      <!-- Chuyên khoa (slot) -->
      <slot name="specialtyInfo"></slot>
      <slot v-if="showNameDoctorSlot" name="nameDoctor"></slot>
      <!-- <slot name="doctorName"></slot> -->
    </div>
  </div>
</template>

<script setup>
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const hospitalsStore = userHospitalsStore();
const hospital = computed(() => hospitalsStore.selectedHospital);
const selectedSpecialty = computed(() => hospitalsStore.selectedSpecialty);
const showNameDoctorSlot = computed(() => {
  return (
    !!route.params.specialtyID &&
    !!route.params.hospitalID &&
    !!route.params.doctorID
  );
});
</script>

<style scoped></style>
