<template>
  <div class="min-h-screen px-4 py-8 min-w-[1180px] mx-auto">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-600 mb-4">
      <span class="text-bold text-gray-900 font-bold">Trang chủ</span> &gt;
      <span class="text-[#00b5f1] text-m">
        {{ hospital.NAME }}
      </span>
      &gt;
      <span class="text-cyan-600 font-semibold"> Hình thức đặt khám</span>
    </nav>

    <!-- Tiêu đề -->
    <h2 class="text-3xl font-bold text-cyan-600 text-center">
      Các hình thức đặt khám
    </h2>
    <p class="text-center text-gray-600 mt-2">
      Đặt khám nhanh chóng, không phải chờ đợi với nhiều cơ sở y tế trên khắp
      các tỉnh thành
    </p>

    <!-- Các hình thức đặt khám -->
    <div class="mt-10 flex flex-wrap justify-center gap-6">
      <RouterLink
        @click="goToBookingSpecialties(hospital)"
        :to="option.to"
        v-for="option in bookingOptions"
        :key="option.label"
        class="w-64 p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition flex items-center gap-3">
        <img :src="option.icon" alt="icon" class="w-12 h-12 object-contain" />
        <span class="font-semibold text-gray-700 text-base">{{
          option.label
        }}</span>
      </RouterLink>
    </div>

    <!-- Nút quay lại -->
    <div class="text-center mt-10">
      <button
        @click="$router.back()"
        class="text-cyan-600 font-semibold hover:underline flex items-center justify-center gap-1">
        ⬅️ Quay lại
      </button>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { computed } from "vue";
import router from "@/router";
const hospitalStore = userHospitalsStore();

const hospital = computed(() => hospitalStore.selectedHospital);
function goToBookingSpecialties(hospital) {
  hospitalStore.setHospital(hospital);
  router.push("/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa");
}
const bookingOptions = [
  {
    label: "Đặt khám theo chuyên khoa",
    icon: "/icons/speciality.png",
    to: "/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa",
  },
  {
    label: "Đặt khám theo Bác sĩ",
    icon: "/icons/doctor.png",
  },
  {
    label: "Đặt khám ngoài giờ",
    icon: "/icons/after-hour.png",
  },
];
</script>
