<template>
  <div class="min-h-screen px-4 py-8 min-w-[1170px] mx-auto bg-blue-50">
    <!-- Breadcrumb -->
    <BreadCum class="max-w-[1170px] mx-auto justify-center bg-blue-50">
      <template #middle>
        <span class="text-[#00b5f1] font-bold">
          {{ hospital.NAME }}
        </span>
        <span class="text-bold text-gray-900 font-bold"> &gt;</span>
        <span class="text-cyan-600 font-bold"> Hình thức đặt khám</span>
      </template>
    </BreadCum>

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
    <div class="mt-10 max-w-[1170px] mx-auto">
      <div class="flex justify-start">
        <button
          @click="$router.back()"
          class="flex items-center text-cyan-600 hover:text-cyan-500 p-2 rounded-lg hover:bg-cyan-50 transition-colors">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          <span class="font-medium">Quay lại</span>
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import BreadCum from "@/components/breadcrumb.vue";
import { computed, onMounted } from "vue";
import router from "@/router";
import datKhamChuyenKhoa from "@/assets/logo/dat-kham-chuyen-khoa.webp";
import datKhamTheoBS from "@/assets/logo/dat-kham-theo-bs.webp";
import datKhamTaiCoSo from "@/assets/logo/dat-kham-tai-co-so.webp";
const hospitalStore = userHospitalsStore();

const hospital = computed(() => hospitalStore.selectedHospital);

// Clear data khi component mount để tránh cache
onMounted(() => {
  // Chỉ clear nếu không có hospital được chọn từ search
  if (!hospital.value) {
    hospitalStore.clearAllData();
  }
});
function goToBookingSpecialties(hospital) {
  hospitalStore.setHospital(hospital);
  router.push("/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa");
}
const bookingOptions = [
  {
    label: "Đặt khám theo chuyên khoa",
    icon: datKhamChuyenKhoa,
    to: "/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa",
  },
  {
    label: "Đặt khám theo Bác sĩ",
    icon: datKhamTheoBS,
  },
  {
    label: "Đặt khám ngoài giờ",
    icon: datKhamTaiCoSo,
  },
];
</script>
