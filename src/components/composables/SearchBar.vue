<template>
  <div class="w-full relative">
    <div class="w-full max-w-2xl mx-auto">
      <form @submit.prevent="handleSearch" class="relative">
        <!-- Search Input -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm bác sĩ, bệnh viện, chuyên khoa..."
          class="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 text-sm hover:border-sky-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
          @input="onSearchInput"
          @keyup.enter="handleSearch"
          @focus="onFocus" />

        <!-- Search Icon -->
        <div class="absolute inset-y-0 left-4 flex items-center text-gray-500">
          <i class="fa-solid fa-magnifying-glass text-lg"></i>
        </div>

        <!-- Clear Button -->
        <div
          v-if="searchQuery"
          class="absolute inset-y-0 right-4 flex items-center">
          <button
            type="button"
            @click="clearSearch"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50">
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
      class="fixed z-[99999] bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto backdrop-blur-sm"
      :style="dropdownStyle">
      <!-- Loading State -->
      <div v-if="isLoading" class="p-6 text-center text-gray-500">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-3"></div>
        <p class="text-sm font-medium">Đang tìm kiếm...</p>
        <p class="text-xs text-gray-400 mt-1">Vui lòng chờ trong giây lát</p>
      </div>

      <!-- No Results -->
      <div
        v-else-if="searchResults.length === 0 && searchQuery.length >= 2"
        class="p-6 text-center text-gray-500">
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-search text-gray-400 text-xl"></i>
        </div>
        <p class="text-sm font-medium mb-1">Không tìm thấy kết quả</p>
        <p class="text-xs text-gray-400">
          Thử thay đổi từ khóa "{{ searchQuery }}"
        </p>
      </div>

      <!-- Results -->
      <div v-else-if="searchResults.length > 0" class="py-2">
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-800 text-sm">
              Kết quả tìm kiếm
            </h3>
            <button
              @click="handleSearch"
              class="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center gap-1">
              Xem tất cả
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Results List -->
        <div class="divide-y divide-gray-100">
          <div
            v-for="result in searchResults"
            :key="result.id"
            @click="selectResult(result)"
            class="px-4 py-4 hover:bg-sky-50 cursor-pointer transition-all duration-200 border-l-4 border-transparent hover:border-sky-500">
            <div class="flex items-start space-x-4">
              <!-- Icon -->
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                :class="getIconBackground(result.type)">
                <img
                  v-if="result.type === 'hospital' && result.IMG_SRC"
                  :src="result.IMG_SRC"
                  :alt="result.HospitalName || result.name"
                  class="w-8 h-8 rounded-lg object-cover"
                  @error="handleImageError" />
                <img
                  v-else-if="result.logo"
                  :src="result.logo"
                  :alt="result.name"
                  class="w-8 h-8 rounded-lg object-cover"
                  @error="handleImageError" />
                <i
                  v-else
                  :class="getIconClass(result.type)"
                  class="text-white text-base"></i>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <h4 class="font-semibold text-gray-900 text-sm truncate">
                    {{
                      result.DoctorName ||
                      result.HospitalName ||
                      result.name ||
                      result.fullName
                    }}
                  </h4>
                  <i
                    v-if="result.verified"
                    class="fa-solid fa-check-circle text-sky-500 text-xs"></i>
                </div>

                <!-- Additional info for doctors -->
                <div
                  v-if="
                    result.type === 'doctor' &&
                    (result.Hospital || result.hospitalName)
                  "
                  class="mt-2 flex items-center text-xs text-gray-500">
                  <img
                    v-if="result.IMG_SRC"
                    :src="`http://localhost:3000${result.IMG_SRC}`"
                    alt="Hospital Logo"
                    class="w-4 h-4 rounded-full mr-1 object-cover"
                    @error="handleImageError" />
                  <i v-else class="fa-solid fa-hospital mr-1 text-gray-400"></i>
                  <span class="truncate">{{
                    result.Hospital || result.hospitalName
                  }}</span>
                </div>

                <!-- Additional info for hospitals -->
                <div
                  v-if="
                    result.type === 'hospital' &&
                    (result.ADDRESS || result.hospitalAddress)
                  "
                  class="mt-2 flex items-center text-xs text-gray-500">
                  <i class="fa-solid fa-location-dot mr-1"> </i>
                  <span class="truncate">{{
                    result.ADDRESS || result.hospitalAddress
                  }}</span>
                </div>

                <!-- Hospital type indicator -->
                <div
                  v-if="result.type === 'hospital' && result.TYPE"
                  class="mt-1 flex items-center text-xs text-gray-400">
                  <i class="fa-solid fa-tag mr-1"></i>
                  <span class="truncate">{{
                    result.TYPE === "public" ? "Bệnh viện công" : "Bệnh viện tư"
                  }}</span>
                </div>
              </div>

              <!-- Arrow indicator -->
              <div class="flex items-center text-gray-400">
                <i class="fa-solid fa-chevron-right text-xs"></i>
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
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/searchStore";
import { userHospitalsStore } from "@/stores/getHospitalsStore";

const searchStore = useSearchStore();
const router = useRouter();
const hospitalsStore = userHospitalsStore();

// Reactive data
const searchQuery = ref("");
const showResults = ref(false);
const isLoading = ref(false);
const searchResults = ref([]);
const dropdownStyle = ref({});

// Computed properties từ store
const doctorResults = computed(() => searchStore.doctorResults || []);
const hospitalResults = computed(() => searchStore.hospitalResults || []);
const clinicResults = computed(() => searchStore.clinicResults || []);
const specialtyResults = computed(() => searchStore.specialtyResults || []);

// Helper function to normalize Vietnamese text
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[đĐ]/g, "d") // Replace đ/Đ with d
    .replace(/[Đ]/g, "D");
};

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

  try {
    // Gọi API search từ store
    await searchStore.searchKeyword(searchQuery.value);

    // Lấy kết quả từ store và kết hợp lại
    const allResults = [];

    // Thêm doctors (chỉ những bác sĩ có tên)
    if (doctorResults.value.length > 0) {
      const validDoctors = doctorResults.value.filter(
        (doctor) => doctor.DoctorName
      );
      allResults.push(
        ...validDoctors.map((doctor) => {
          const logoUrl = doctor.IMG_SRC
            ? `http://localhost:3000${doctor.IMG_SRC}`
            : null;
          return {
            ...doctor,
            type: "doctor",
            verified: doctor.verified || false,
            name: doctor.DoctorName || doctor.name,
            specialty: doctor.Specialty || doctor.specialty,
            hospital: doctor.Hospital || doctor.hospital,
            // Thêm các ID cần thiết cho navigation
            SpecialtyID: doctor.SpecialtyID,
            HospitalID: doctor.HospitalID,
            DoctorID: doctor.DoctorID,
            // Thêm logo từ bệnh viện
            logo: logoUrl,
          };
        })
      );
    }

    // Thêm hospitals
    if (hospitalResults.value.length > 0) {
      allResults.push(
        ...hospitalResults.value.map((hospital) => {
          const logoUrl = hospital.IMG_SRC
            ? `http://localhost:3000${hospital.IMG_SRC}`
            : null;
          return {
            ...hospital,
            type: "hospital",
            verified: hospital.verified || false,
            name: hospital.HospitalName || hospital.name,
            address: hospital.ADDRESS || hospital.address,
            // Thêm logo cho bệnh viện
            logo: logoUrl,
          };
        })
      );
    }

    // Thêm clinics
    if (clinicResults.value.length > 0) {
      allResults.push(
        ...clinicResults.value.map((clinic) => ({
          ...clinic,
          type: "clinic",
          verified: clinic.verified || false,
        }))
      );
    }

    // Thêm specialties
    if (specialtyResults.value.length > 0) {
      allResults.push(
        ...specialtyResults.value.map((specialty) => ({
          ...specialty,
          type: "specialty",
          verified: specialty.verified || false,
        }))
      );
    }

    // Filter kết quả dựa trên query (nếu cần)
    const normalizedQuery = normalizeText(searchQuery.value);
    if (normalizedQuery.length >= 2) {
      searchResults.value = allResults.filter((item) => {
        const normalizedName = normalizeText(item.name || item.fullName || "");
        const normalizedAddress = normalizeText(
          item.address || item.hospital || item.specialty || ""
        );
        const searchText = `${normalizedName} ${normalizedAddress}`;
        return searchText.includes(normalizedQuery);
      });
    } else {
      searchResults.value = allResults;
    }
  } catch (error) {
    console.error("Search error:", error);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
    updateDropdownPosition();
  }
};

const getIconBackground = (type) => {
  const backgrounds = {
    // hospital: "bg-gradient-to-br from-white-500 to-white-600",
    clinic: "bg-gradient-to-br from-pink-500 to-pink-600",
    doctor: "bg-gradient-to-br from-sky-500 to-sky-600",
    specialty: "bg-gradient-to-br from-purple-500 to-purple-600",
  };
  return backgrounds[type];
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

const handleImageError = (event) => {
  event.target.style.display = "none";
};

const selectResult = (result) => {
  console.log("Selected result:", result);

  // Navigate based on result type
  if (result.type === "hospital") {
    // Map dữ liệu từ search để phù hợp với cấu trúc store
    const hospitalData = {
      ID: result.HospitalID,
      NAME: result.HospitalName,
      ADDRESS: result.ADDRESS,
      TYPE: "public", // Default type
      IMG_SRC: result.IMG_SRC, // Default empty image
      RATING: 4.5, // Default rating
      IS_VERIFIED: true, // Default verified
    };

    // Lưu thông tin bệnh viện vào store trước khi điều hướng
    hospitalsStore.setHospital(hospitalData);
    router.push("/dat-kham-benh");
  } else if (result.type === "clinic") {
    router.push(`/co-so-y-te/phong-kham/${result.id}`);
  } else if (result.type === "doctor") {
    // Tạo URL với format mới: /specialtyID/hospitalID/doctorID
    const specialtyID = result.SpecialtyID || result.specialtyID;
    const hospitalID = result.HospitalID || result.hospitalID;
    const doctorID = result.DoctorID || result.id;

    console.log("Doctor navigation data:", {
      specialtyID,
      hospitalID,
      doctorID,
      result,
    });

    if (specialtyID && hospitalID && doctorID) {
      router.push(
        `/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa/chon-bac-si/${specialtyID}/${hospitalID}/${doctorID}`
      );
    } else {
      // Fallback nếu không có đủ thông tin
      router.push(`/dat-kham-benh/dat-kham-benh-theo-bac-si/${doctorID}`);
    }
  } else if (result.type === "specialty") {
    router.push(
      `/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa/${
        result.SpecialtyID || result.id
      }`
    );
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
