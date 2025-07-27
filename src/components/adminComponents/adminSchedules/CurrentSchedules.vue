<template>
  <div class="bg-white rounded-lg border border-gray-200 h-full">
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 flex items-center">
        <i class="fas fa-calendar-alt text-blue-500 mr-2"></i>
        Lịch Làm Việc Hiện Tại
      </h3>
    </div>

    <div class="p-3 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
      <div v-if="schedules.length === 0" class="text-center py-8 text-gray-500">
        <i class="fas fa-calendar-times text-4xl mb-3 text-gray-300"></i>
        <p class="text-sm">Chưa có lịch làm việc nào</p>
      </div>

      <div
        v-for="schedule in schedules"
        :key="schedule.id"
        class="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1">
            <div class="flex items-center mb-1">
              <span
                class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {{ getDayOfWeek(schedule.scheduleDate) }}
              </span>
              <span class="text-sm font-medium text-gray-800 ml-2">
                {{ formatDate(schedule.scheduleDate) }}
              </span>
            </div>
            <div class="text-sm text-gray-600 mb-1">
              <i class="fas fa-clock text-gray-400 mr-1"></i>
              {{ formatTime(schedule.startTime) }} -
              {{ formatTime(schedule.endTime) }}
            </div>
            <div
              v-if="schedule.hasLunchBreak"
              class="text-xs text-gray-500 mb-1">
              <i class="fas fa-utensils text-gray-400 mr-1"></i>
              Nghỉ trưa: {{ formatTime(schedule.lunchStart) }} -
              {{ formatTime(schedule.lunchEnd) }}
            </div>
            <div v-if="schedule.notes" class="text-xs text-gray-600 mt-1">
              <i class="fas fa-sticky-note text-gray-400 mr-1"></i>
              {{ schedule.notes }}
            </div>
          </div>
          <button
            @click="emit('delete', schedule.id)"
            class="text-red-500 hover:text-red-700 transition-colors ml-2"
            title="Xóa lịch làm việc">
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScheduleStore } from "../../../stores/scheduleStore.js";

const scheduleStore = useScheduleStore();

const props = defineProps({
  schedules: {
    type: Array,
    default: () => [],
  },
  onDelete: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["delete"]);

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get day of week
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", { weekday: "short" });
};

// Format time
const formatTime = (time) => {
  if (!time) return "";
  return time;
};
</script>

<style scoped>
/* Custom Scrollbar Styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e0, #a0aec0);
  border-radius: 4px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #a0aec0, #718096);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: #f7fafc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
}
</style>
