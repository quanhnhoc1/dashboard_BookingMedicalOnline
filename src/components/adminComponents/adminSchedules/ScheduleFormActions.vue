<template>
  <div class="flex gap-4 mb-12">
    <button
      @click="emit('reset')"
      type="button"
      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      Reset
    </button>
    <button
      @click="emit('save')"
      type="button"
      :disabled="scheduleStore.isLoading || !isFormValid"
      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
      <span
        v-if="scheduleStore.isLoading"
        class="flex items-center justify-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Đang lưu...
      </span>
      <span v-else>Lưu</span>
    </button>
  </div>
</template>

<script setup>
import { useScheduleStore } from "../../../stores/scheduleStore.js";

const scheduleStore = useScheduleStore();

const props = defineProps({
  isFormValid: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["reset", "save"]);
</script>
