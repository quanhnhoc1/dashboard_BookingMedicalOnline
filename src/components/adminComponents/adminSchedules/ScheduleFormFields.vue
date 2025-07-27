<template>
  <div class="space-y-4">
    <!-- Date Selection -->
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-calendar text-blue-500 mr-2"></i>
        Ngày Làm Việc
      </label>
      <input
        type="date"
        :value="scheduleDate"
        @input="$emit('update:scheduleDate', $event.target.value)"
        :min="today"
        class="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:border-blue-500 focus:outline-none bg-white" />
    </div>

    <!-- Time Selection -->
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-clock text-blue-500 mr-2"></i>
        Giờ Làm Việc
      </label>
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-2 font-medium"
            >Giờ bắt đầu</label
          >
          <input
            type="time"
            :value="startTime"
            @input="$emit('update:startTime', $event.target.value)"
            @change="validateTime"
            class="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:border-blue-500 focus:outline-none bg-white" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-2 font-medium"
            >Giờ kết thúc</label
          >
          <input
            type="time"
            :value="endTime"
            @input="$emit('update:endTime', $event.target.value)"
            @change="validateTime"
            class="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:border-blue-500 focus:outline-none bg-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  scheduleDate: {
    type: String,
    default: "",
  },
  startTime: {
    type: String,
    default: "",
  },
  endTime: {
    type: String,
    default: "",
  },
  hasLunchBreak: {
    type: Boolean,
    default: false,
  },
  lunchStart: {
    type: String,
    default: "",
  },
  lunchEnd: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
});

// Emits
const emit = defineEmits([
  "update:scheduleDate",
  "update:startTime",
  "update:endTime",
  "update:hasLunchBreak",
  "update:lunchStart",
  "update:lunchEnd",
  "update:notes",
]);

// Computed
const today = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

// Methods
const validateTime = () => {
  if (props.startTime && props.endTime) {
    if (props.startTime >= props.endTime) {
      alert("Giờ kết thúc phải sau giờ bắt đầu!");
    }
  }
};
</script>
