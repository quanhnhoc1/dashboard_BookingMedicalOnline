<template>
  <div class="relative flex-1 w-full max-w-full md:max-w-md">
    <input
      v-model="searchKeyword"
      @input="handleSearchInput"
      @keyup.enter="handleSearch"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-sm" />

    <!-- Search Icon -->
    <svg
      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>

    <!-- Clear button -->
    <button
      v-if="searchKeyword"
      @click="clearSearch"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      type="button">
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from "vue";

// Props
const props = defineProps({
  placeholder: {
    type: String,
    default: "Tìm kiếm...",
  },
  debounceTime: {
    type: Number,
    default: 300,
  },
  initialValue: {
    type: String,
    default: "",
  },
});

// Emits
const emit = defineEmits(["search", "clear", "input-change"]);

// Reactive data
const searchKeyword = ref(props.initialValue);
let searchTimeout = null;

// Watch for external changes to searchKeyword
watch(
  () => props.initialValue,
  (newValue) => {
    searchKeyword.value = newValue;
  }
);

// Function xử lý tìm kiếm ngay lập tức với debounce
function handleSearchInput() {
  // Emit input change event
  emit("input-change", searchKeyword.value);

  // Clear timeout cũ nếu có
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Đặt timeout mới để debounce
  searchTimeout = setTimeout(() => {
    performSearch();
  }, props.debounceTime);
}

// Hàm chuẩn hóa chuỗi để tìm kiếm không phân biệt chữ hoa/thường và có dấu/không dấu
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .toLowerCase()
    .trim();
}

// Function thực hiện tìm kiếm
function performSearch() {
  if (searchKeyword.value.trim()) {
    const normalizedKeyword = normalizeString(searchKeyword.value);
    emit("search", {
      original: searchKeyword.value.trim(),
      normalized: normalizedKeyword,
    });
  } else {
    emit("clear");
  }
}

// Function xử lý khi nhấn Enter
function handleSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  performSearch();
}

// Function xóa từ khóa tìm kiếm
function clearSearch() {
  searchKeyword.value = "";
  emit("clear");
  emit("input-change", "");
}

// Cleanup timeout khi component unmount
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
