<template>
  <div class="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md">
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-center py-3 text-lg font-semibold">
      Vui lòng chọn Bác sĩ
    </div>

    <!-- Search & Filters -->
    <div class="p-4 space-y-3">
      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm nhanh bác sĩ"
          class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
        <select v-model="filters.degree" class="filter-select">
          <option value="">Học hàm / học vị</option>
          <option value="TS BS">TS BS</option>
          <option value="BS CKII">BS CKII</option>
          <option value="Bác sĩ">Bác sĩ</option>
        </select>

        <select v-model="filters.specialty" class="filter-select">
          <option value="">Chuyên khoa</option>
          <option value="Khám Chức Năng Hô Hấp">Khám Chức Năng Hô Hấp</option>
          <!-- add more -->
        </select>

        <select v-model="filters.gender" class="filter-select">
          <option value="">Giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
    </div>

    <!-- Doctor List -->
    <div class="px-4 pb-6 space-y-4 max-h-[420px] overflow-y-auto">
      <div
        v-for="(doctor, index) in filteredDoctors"
        :key="index"
        class="border-l-4 border-orange-300 bg-white shadow-sm p-4 rounded-lg space-y-1">
        <p class="font-bold text-orange-600">
          {{ doctor.DESCRIPTION }} {{ doctor.FULL_NAME }}
        </p>
        <p>
          <i class="fas fa-venus-mars text-gray-500 mr-1"></i> Giới tính:
          {{ doctor.FULL_NAME }}
        </p>
        <p>
          <i class="fas fa-stethoscope text-gray-500 mr-1"></i> Chuyên khoa:
          {{ doctor.SpecialtyName }}
        </p>
        <p>
          <i class="fas fa-calendar-alt text-gray-500 mr-1"></i> Lịch khám:
          {{ doctor.FULL_NAME }}
        </p>
        <p>
          <i class="fas fa-dollar-sign text-gray-500 mr-1"></i> Giá khám11:
          {{ doctor.Prices_doctor }}đ
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import AddressHospitals from "@/components/BookingSpecialtiesComponents/addressHospitals.vue";

const hospitalsStore = userHospitalsStore();
const route = useRoute();
const doctors = ref([]);

onMounted(async () => {
  const { specialtyID, hospitalID } = route.params;

  try {
    const data = await hospitalsStore.getDoctorsWithSpecialtyIDAndHospitalID(
      specialtyID,
      hospitalID
    );
    doctors.value = data;
    console.log(doctors.value);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", err);
  }
});
const searchQuery = ref("");
const filters = ref({
  degree: "",
  specialty: "",
  gender: "",
});

const filteredDoctors = computed(() => {
  return doctors.value.filter((doc) => {
    const matchesSearch =
      doc.FULL_NAME?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doc.SPECIALTY_NAME?.toLowerCase().includes(
        searchQuery.value.toLowerCase()
      );

    const matchesDegree =
      !filters.value.degree || doc.DESCRIPTION === filters.value.degree;

    const matchesSpecialty =
      !filters.value.specialty ||
      doc.SPECIALTY_NAME === filters.value.specialty;

    const matchesGender =
      !filters.value.gender || doc.GENDER === filters.value.gender;

    return matchesSearch && matchesDegree && matchesSpecialty && matchesGender;
  });
});
</script>

<style scoped>
.filter-select {
  @apply border border-cyan-500 rounded-md px-2 py-1 text-sm text-cyan-600 focus:outline-none;
}
</style>
