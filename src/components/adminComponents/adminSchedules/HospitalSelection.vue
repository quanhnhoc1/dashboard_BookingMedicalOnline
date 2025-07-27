<template>
  <div class="mb-4">
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-hospital text-blue-500 mr-2"></i>
        Chọn Bệnh Viện
      </label>
      <select
        :value="selectedHospital"
        @change="$emit('update:selectedHospital', $event.target.value)"
        class="w-full p-4 border-2 border-gray-200 rounded-lg text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none bg-white">
        <option value="">-- Chọn bệnh viện --</option>
        <option
          v-for="hospital in hospitals"
          :key="hospital.id"
          :value="hospital.id">
          {{ hospital.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  selectedHospital: {
    type: [String, Number],
    default: "",
  },
  hospitals: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emit = defineEmits(["update:selectedHospital"]);

// Computed
const selectedHospitalInfo = computed(() => {
  return props.hospitals.find((h) => h.id == props.selectedHospital);
});
</script>
