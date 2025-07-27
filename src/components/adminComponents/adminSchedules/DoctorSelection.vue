<template>
  <div class="mb-4">
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-user-md text-blue-500 mr-2"></i>
        Chọn Bác Sĩ
      </label>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="w-full p-4 border-2 border-gray-200 rounded-lg bg-white">
        <div class="flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
          <span class="text-gray-600">Đang tải danh sách bác sĩ...</span>
        </div>
      </div>

      <!-- Doctor Selection -->
      <select
        v-else
        :value="selectedDoctor"
        @change="$emit('update:selectedDoctor', $event.target.value)"
        class="w-full p-4 border-2 border-gray-200 rounded-lg text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none bg-white">
        <option value="">-- Chọn bác sĩ --</option>
        <option
          v-for="doctor in doctors"
          :key="doctor.DOCTOR_PRO_ID"
          :value="doctor.DOCTOR_PRO_ID">
          {{ doctor.DOCTOR_NAME || "Bác sĩ" }} -
          {{ doctor.specialty || "Chuyên khoa" }}
        </option>
      </select>

      <!-- No Doctors Message -->
      <div
        v-if="!loading && doctors.length === 0"
        class="w-full p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
        <div class="text-center text-gray-500">
          <i class="fas fa-user-md text-gray-400 mb-2"></i>
          <p>Không có bác sĩ nào trong bệnh viện này</p>
        </div>
      </div>

      <!-- Doctor Info Display -->
      <div
        v-if="selectedDoctorInfo"
        class="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
            <span class="text-white font-bold text-sm">{{
              selectedDoctorInfo.DOCTOR_NAME.charAt(0)
            }}</span>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-800 text-base mb-1">
              {{ selectedDoctorInfo.DOCTOR_NAME }}
            </h4>
            <p class="text-blue-600 text-sm font-medium mb-1">
              {{ selectedDoctorInfo.specialty || "Chuyên khoa" }}
            </p>
            <p class="text-gray-600 text-sm">
              <i class="fas fa-star text-yellow-500 mr-1"></i>
              {{ selectedDoctorInfo.experience || "Nhiều" }} năm kinh nghiệm
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  selectedDoctor: {
    type: [String, Number],
    default: "",
  },
  doctors: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["update:selectedDoctor"]);

// Computed
const selectedDoctorInfo = computed(() => {
  console.log("Looking for doctor ID:", props.selectedDoctor);
  console.log("Available doctors:", props.doctors);

  const found = props.doctors.find(
    (d) => String(d.DOCTOR_PRO_ID) === String(props.selectedDoctor)
  );
  console.log("Found doctor:", found);

  return found;
});
</script>
