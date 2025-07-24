<template>
  <div class="w-full relative">
    <div class="w-full max-w-2xl mx-auto">
      <form @submit.prevent="handleSearch" class="relative">
        <!-- Search Input -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm bác sĩ, bệnh viện, chuyên khoa..."
          class="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 text-sm hover:border-sky-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all duration-200"
          @input="onSearchInput"
          @keyup.enter="handleSearch"
          @focus="onFocus" />

        <!-- Search Icon -->
        <div class="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <!-- Clear Button -->
        <div
          v-if="searchQuery"
          class="absolute inset-y-0 right-3 flex items-center">
          <button
            type="button"
            @click="clearSearch"
            class="p-1 text-gray-400 hover:text-red-500 transition-colors">
            <i class="fa-solid fa-times text-sm"></i>
          </button>
        </div>
      </form>
    </div>

    <!-- Search Results Dropdown -->
    <div
      v-if="
        showResults &&
        (searchResults.length > 0 ||
          isLoading ||
          (searchQuery.length >= 2 && searchResults.length === 0))
      "
      class="fixed z-[99999] bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto"
      :style="dropdownStyle">
      <!-- Loading State -->
      <div v-if="isLoading" class="p-4 text-center text-gray-500">
        <i class="fa-solid fa-spinner fa-spin mr-2"></i>
        Đang tìm kiếm...
      </div>

      <!-- No Results -->
      <div
        v-else-if="searchResults.length === 0 && searchQuery.length >= 2"
        class="p-4 text-center text-gray-500">
        <i class="fa-solid fa-search text-gray-300 mb-2"></i>
        <p class="text-sm">Không có kết quả với từ khóa "{{ searchQuery }}"</p>
        <p class="text-xs text-gray-400 mt-1">Thử thay đổi từ khóa tìm kiếm</p>
      </div>

      <!-- Results -->
      <div v-else-if="searchResults.length > 0" class="py-2">
        <!-- Header -->
        <div class="px-4 py-2 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 text-sm">Cơ sở y tế</h3>
            <button
              @click="handleSearch"
              class="text-sky-600 hover:text-sky-700 text-sm font-medium">
              Xem tất cả >>
            </button>
          </div>
        </div>

        <!-- Results List -->
        <div class="divide-y divide-gray-100">
          <div
            v-for="result in searchResults"
            :key="result.id"
            @click="selectResult(result)"
            class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="flex items-center space-x-3">
              <!-- Icon -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :class="getIconBackground(result.type)">
                <img
                  v-if="result.logo"
                  :src="result.logo"
                  :alt="result.name"
                  class="w-8 h-8 rounded-full object-cover" />
                <i
                  v-else
                  :class="getIconClass(result.type)"
                  class="text-white text-sm"></i>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <h4 class="font-medium text-gray-900 text-sm truncate">
                    {{ result.name }}
                  </h4>
                  <i
                    v-if="result.verified"
                    class="fa-solid fa-check-circle text-blue-500 text-xs"></i>
                </div>
                <p class="text-xs text-gray-600 mt-1 line-clamp-2">
                  {{ result.address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot name="textIntro"></slot>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive data
const searchQuery = ref("");
const showResults = ref(false);
const isLoading = ref(false);
const searchResults = ref([]);
const dropdownStyle = ref({});

// Mock data for demonstration
const mockSearchResults = [
  {
    id: 1,
    name: "Phòng khám Chuyên Khoa Da Trần Thịnh",
    address: "980 Trần Hưng Đạo, Phường 7, Quận 5, TP.HCM",
    type: "clinic",
    verified: false,
    logo: null,
  },
  {
    id: 2,
    name: "Bệnh viện Đa khoa Vạn Hạnh",
    address:
      "781/B1-B3-B5 Lê Hồng Phong, Phường Hoà Hưng, Thành Phố Hồ Chí Minh",
    type: "hospital",
    verified: false,
    logo: null,
  },
  {
    id: 3,
    name: "Bệnh viện Đa khoa Đồng Nai",
    address:
      "02 Đồng Khởi, Phường Tam Hiệp, Tỉnh Đồng Nai (Địa chỉ cũ: 02 Đồng Khởi, Phường Tam Hòa, TP. Biên Hòa, Tỉnh Đồng Nai)",
    type: "hospital",
    verified: true,
    logo: null,
  },
  {
    id: 4,
    name: "Bệnh viện Đa khoa TP Cần Thơ",
    address: "123 Nguyễn Văn Linh, Ninh Kiều, Cần Thơ",
    type: "hospital",
    verified: true,
    logo: null,
  },
  {
    id: 5,
    name: "Bệnh viện Nhi đồng Cần Thơ",
    address: "456 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ",
    type: "hospital",
    verified: false,
    logo: null,
  },
  {
    id: 6,
    name: "Phòng khám Đa khoa Tâm An",
    address: "789 Lê Hồng Phong, Quận 10, TP.HCM",
    type: "clinic",
    verified: false,
    logo: null,
  },
  {
    id: 7,
    name: "Bệnh viện Tim mạch Cần Thơ",
    address: "321 Nguyễn Văn Linh, Cái Răng, Cần Thơ",
    type: "hospital",
    verified: true,
    logo: null,
  },
  {
    id: 8,
    name: "Phòng khám Nhi khoa Sunshine",
    address: "555 Võ Văn Tần, Quận 3, TP.HCM",
    type: "clinic",
    verified: false,
    logo: null,
  },
];

// Methods
const onSearchInput = () => {
  if (searchQuery.value.length >= 2) {
    performSearch();
    updateDropdownPosition();
  } else {
    showResults.value = false;
    searchResults.value = [];
  }
};

const onFocus = () => {
  if (searchQuery.value.length >= 2) {
    showResults.value = true;
    updateDropdownPosition();
  }
};

const updateDropdownPosition = () => {
  const searchInput = document.querySelector('input[type="text"]');
  if (searchInput) {
    const rect = searchInput.getBoundingClientRect();
    dropdownStyle.value = {
      top: `${rect.bottom + 5}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    };
  }
};

const performSearch = async () => {
  if (!searchQuery.value.trim()) return;

  isLoading.value = true;
  showResults.value = true;

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock search results based on query
  const query = searchQuery.value.toLowerCase();
  const results = [];

  // Search logic - trả về kết quả cho nhiều từ khóa
  if (query.length >= 2) {
    results.push(
      ...mockSearchResults.filter((item) => {
        const searchText = `${item.name} ${item.address}`.toLowerCase();
        return searchText.includes(query);
      })
    );
  }

  searchResults.value = results;
  isLoading.value = false;

  // Luôn cập nhật vị trí dropdown, kể cả khi không có kết quả
  updateDropdownPosition();
};

const getIconBackground = (type) => {
  const backgrounds = {
    hospital: "bg-red-500",
    clinic: "bg-pink-500",
    doctor: "bg-blue-500",
    specialty: "bg-purple-500",
  };
  return backgrounds[type] || "bg-gray-500";
};

const getIconClass = (type) => {
  const icons = {
    hospital: "fa-solid fa-hospital",
    clinic: "fa-solid fa-clinic-medical",
    doctor: "fa-solid fa-user-md",
    specialty: "fa-solid fa-stethoscope",
  };
  return icons[type] || "fa-solid fa-building";
};

const selectResult = (result) => {
  console.log("Selected result:", result);

  // Navigate based on result type
  if (result.type === "hospital") {
    router.push(`/facilities/hospital/${result.id}`);
  } else if (result.type === "clinic") {
    router.push(`/facilities/clinic/${result.id}`);
  }

  // Clear search and hide results
  searchQuery.value = "";
  showResults.value = false;
  searchResults.value = [];
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search",
      query: { q: searchQuery.value },
    });
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  showResults.value = false;
  searchResults.value = [];
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showResults.value = false;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", updateDropdownPosition);
  window.addEventListener("resize", updateDropdownPosition);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", updateDropdownPosition);
  window.removeEventListener("resize", updateDropdownPosition);
});

// Watch for search query changes
watch(searchQuery, (newValue) => {
  if (newValue.length >= 2) {
    performSearch();
  } else if (newValue.length === 0) {
    showResults.value = false;
    searchResults.value = [];
  } else {
    // Khi chỉ có 1 ký tự, ẩn dropdown
    showResults.value = false;
    searchResults.value = [];
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
