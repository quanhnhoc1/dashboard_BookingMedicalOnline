<template>
  <div class="min-h-screen flex flex-col mx-auto bg-gray-50">
    <HeaderWithPhoneCallNumber />
    <div class="min-w-[1170px] mx-auto justify-center">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-4">
        <span class="text-bold text-gray-900 font-bold">Trang chủ</span> &gt;
        <span class="text-[#00b5f1] text-m"> {{ hospital.NAME }} </span>
        &gt;
        <span class="text-cyan-600 font-semibold"> Chọn chuyên khoa </span>
      </nav>

      <!-- Tiêu đề -->

      <div class="flex flex-row justify-evenly mb-6">
        <div>
          <addressHospitals />
        </div>
        <div>
          <specitaltiesComponent />
        </div>
      </div>

      <div class="text-center mt-10">
        <button
          @click="$router.back()"
          class="text-cyan-600 font-semibold hover:underline flex items-center justify-center gap-1">
          ⬅️ Quay lại
        </button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import addressHospitals from "@/components/BookingSpecialtiesComponents/addressHospitals.vue";
import specitaltiesComponent from "@/components/BookingSpecialtiesComponents/specitaltiesComponent.vue";
import HeaderWithPhoneCallNumber from "@/components/headerWithPhoneCallNumber.vue";
import { computed, onMounted } from "vue";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
const hospitalsStore = userHospitalsStore();
const hospital = computed(() => hospitalsStore.selectedHospital);

// console.log(hospital.value);
onMounted(() => {
  if (hospital.value && hospital.value.ID) {
    hospitalsStore.getSpecialtiesWithHospitalID(hospital.value.ID);
  } else {
    console.warn("Chưa có hospital được chọn!");
  }
});
</script>

<style scoped></style>
