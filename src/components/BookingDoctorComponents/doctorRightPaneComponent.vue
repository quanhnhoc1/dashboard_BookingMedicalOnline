<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-100">
    <div
      class="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center py-4 px-6 rounded-t-xl">
      <h2 class="text-lg md:text-xl font-semibold">Vui lòng chọn Bác sĩ</h2>
      <p class="text-cyan-100 text-sm mt-1">
        Tìm và lọc bác sĩ theo nhu cầu của bạns
      </p>
    </div>

    <!-- Search & Filters -->
    <div class="p-4 md:p-6 space-y-4">
      <!-- Search -->
      <div class="relative">
        <i
          class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm nhanh bác sĩ theo tên hoặc chuyên khoa..."
          class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select v-model="filters.degree" class="filter-select">
          <option value="">Tất cả học hàm/học vị</option>
          <option value="TS BS">TS BS</option>
          <option value="BS CKII">BS CKII</option>
          <option value="Bác sĩ">Bác sĩ</option>
        </select>

        <select v-model="filters.gender" class="filter-select">
          <option value="">Tất cả giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>
      </div>
    </div>

    <!-- Doctor List -->
    <div class="px-4 md:px-6 pb-6">
      <div class="space-y-3 max-h-[500px] overflow-y-auto">
        <div
          v-for="(doctor, index) in filteredDoctors"
          :key="index"
          class="border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-50 to-white shadow-sm hover:shadow-md transition-shadow duration-200 p-4 md:p-5 rounded-lg">
          <!-- Doctor Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 class="font-bold text-lg text-gray-800">
                {{ doctor.DESCRIPTION }} {{ doctor.FULL_NAME }}
              </h3>
              <p class="text-cyan-600 text-sm font-medium">
                {{ doctor.SpecialtyName }}
              </p>
            </div>
            <div class="flex-shrink-0">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                <i class="fas fa-user-md mr-1"></i>
                Bác sĩ
              </span>
            </div>
          </div>

          <!-- Doctor Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div class="flex items-center space-x-2">
              <i class="fas fa-venus-mars text-gray-500 w-4"></i>
              <span class="text-gray-600">Giới tính:</span>
              <span
                v-if="doctor.GENDER === 'male'"
                class="font-medium text-gray-800"
                >Nam</span
              >
              <span
                v-else-if="doctor.GENDER === 'female'"
                class="font-medium text-gray-800"
                >Nữ</span
              >
            </div>

            <div class="flex items-center space-x-2">
              <i class="fas fa-stethoscope text-gray-500 w-4"></i>
              <span class="text-gray-600">Chuyên khoa:</span>
              <span class="font-medium text-gray-800">{{
                doctor.SpecialtyName
              }}</span>
            </div>

            <div class="flex items-center space-x-2">
              <i class="fas fa-calendar-alt text-gray-500 w-4"></i>
              <span class="text-gray-600">Lịch khám:</span>
              <span class="font-medium text-gray-800">
                {{
                  getDoctorScheduleText(doctor.DOCTOR_PRO_ID) ||
                  "Chưa có lịch khám"
                }}
              </span>
            </div>

            <div class="flex items-center space-x-2">
              <i class="fas fa-dollar-sign text-gray-500 w-4"></i>
              <span class="text-gray-600">Giá khám:</span>
              <span class="font-bold text-green-600">{{
                formatPrice(doctor.PRICES_DOCTOR)
              }}</span>
            </div>
          </div>

          <!-- Action Button -->
          <div class="mt-4 pt-3 border-t border-gray-200">
            <button
              class="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              @click="handleBookDoctor(doctor)">
              <i class="fas fa-calendar-plus"></i>
              <span>Đặt lịch khám</span>
            </button>
          </div>
          <!-- <router-view /> -->
        </div>

        <!-- Empty State -->
        <div v-if="filteredDoctors.length === 0" class="text-center py-8">
          <i class="fas fa-user-md text-gray-300 text-4xl mb-3"></i>
          <p class="text-gray-500 text-sm">Không tìm thấy bác sĩ phù hợp</p>
          <p class="text-gray-400 text-xs mt-1">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { onMounted } from "vue";

import { useRoute } from "vue-router";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { useDoctorStore } from "@/stores/getDoctorStore";
import router from "@/router";
import bookingDatePicker from "./bookingDatePicker.vue";
const doctorStore = useDoctorStore();

const emit = defineEmits(["book"]);
const hospitalsStore = userHospitalsStore();
const route = useRoute();
const doctors = ref([]);

onMounted(async () => {
  const { specialtyID, hospitalID } = route.params;

  async function fetchDoctors() {
    try {
      const data = await hospitalsStore.getDoctorsWithSpecialtyIDAndHospitalID(
        specialtyID,
        hospitalID
      );
      const doctorId = Number(data[0]?.DOCTOR_PRO_ID) || 0;
      await doctorStore.fetchDoctorSchedule(doctorId);
      const doctorScheduleText = computed(() => {
        const schedule = doctorStore.doctorSchedule[doctorId];
        if (!Array.isArray(schedule) || schedule.length === 0) return null;

        // Lấy danh sách DAY_OF_WEEK không trùng lặp
        // const days = [...new Set(schedule.map((item) => item.DAY_OF_WEEK))];
        return days.join(", ");
      });
      doctors.value = data;
      for (const doctor of data) {
        await doctorStore.fetchDoctorSchedule(doctor.DOCTOR_PRO_ID);
      }
      // console.log(doctors.value);
      // console.log(doctorSchedule);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bác sĩ:", err);
    }
  }
  fetchDoctors();
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
      !filters.value.gender ||
      doc.GENDER?.toLowerCase() === filters.value.gender.toLowerCase();

    return matchesSearch && matchesDegree && matchesSpecialty && matchesGender;
  });
});
const dayMap = {
  monday: "Thứ 2",
  tuesday: "Thứ 3",
  wednesday: "Thứ 4",
  thursday: "Thứ 5",
  friday: "Thứ 6",
  saturday: "Thứ 7",
  sunday: "Chủ nhật",
};

const getDoctorScheduleText = (doctorId) => {
  const schedule = doctorStore.doctorSchedule[doctorId];
  if (!Array.isArray(schedule) || schedule.length === 0) return null;

  // Lọc trùng và chuyển sang tiếng Việt
  const days = [...new Set(schedule)];
  return days.map((day) => dayMap[day?.toLowerCase()] || day).join(", ");
};

// Format price function
const formatPrice = (price) => {
  if (!price) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const handleBookDoctor = (doctor) => {
  hospitalsStore.setSelectedDoctor(doctor);
  router.push({
    name: "bookingDateTime",
    params: { doctorID: doctor.DOCTOR_PRO_ID },
  });
};
</script>

<style scoped>
.filter-select {
  @apply border border-gray-300 rounded-lg px-3 py-2.5 text-sm md:text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors cursor-pointer;
}

.filter-select:hover {
  @apply border-cyan-400;
}

/* Custom scrollbar for doctor list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
