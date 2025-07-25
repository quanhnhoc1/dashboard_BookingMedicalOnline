<template>
  <div
    class="md:ml-7 md:mr-9 h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col overflow-hidden">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b mb-4 md:mb-6 flex-shrink-0">
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-2 md:gap-0">
        <div>
          <h1
            class="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div
              class="p-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            Quản lý bác sĩ
          </h1>
          <p class="text-xs md:text-sm text-gray-600 mt-1">
            Quản lý thông tin và hồ sơ bác sĩ trong hệ thống
          </p>
        </div>
        <button
          @click="addNewDoctor"
          class="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          <svg
            class="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span class="hidden sm:inline">Thêm bác sĩ mới</span>
        </button>
      </div>
    </div>

    <!-- Search Section -->
    <div
      class="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6 flex-shrink-0">
      <div class="flex flex-col md:flex-row items-center gap-3">
        <div class="relative flex-1 w-full max-w-full md:max-w-md">
          <input
            v-model="keyword"
            @input="handleSearchInput"
            @keyup.enter="fetchDoctors"
            type="text"
            placeholder="Tìm kiếm theo từ khóa (VD: Nguyễn tim, bệnh viện 115)..."
            class="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-sm" />
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
            v-if="keyword"
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
        <button
          @click="fetchDoctors"
          class="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
          Tìm kiếm
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6 flex-shrink-0">
      <div
        class="bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 border-cyan-500">
        <div class="flex items-center">
          <div class="p-2 bg-cyan-100 rounded-lg">
            <svg
              class="w-6 h-6 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs font-medium text-gray-600">Tổng số bác sĩ</p>
            <p class="text-xl md:text-2xl font-bold text-gray-900">
              {{ doctorStore.doctors.length }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 border-green-500">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs font-medium text-gray-600">Đang hoạt động</p>
            <p class="text-xl md:text-2xl font-bold text-gray-900">
              {{ activeDoctors }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 border-blue-500">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs font-medium text-gray-600">Chuyên khoa</p>
            <p class="text-xl md:text-2xl font-bold text-gray-900">
              {{ uniqueSpecialties }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden flex-1 min-h-0 flex flex-col">
      <div
        class="px-2 md:px-4 py-2 md:py-3 border-b border-gray-200 flex-shrink-0">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold text-gray-900">
            Danh sách bác sĩ
          </h3>
          <p class="text-xs text-gray-500">
            Cập nhật lần cuối: {{ lastUpdated }}
          </p>
        </div>
      </div>
      <div class="flex-1 min-h-0 overflow-hidden">
        <div
          class="h-full overflow-x-auto overflow-y-auto"
          style="max-height: calc(100vh - 400px)">
          <table class="w-full min-w-[700px] text-sm">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thông tin bác sĩ
                </th>
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chuyên khoa
                </th>
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                  Bệnh viện
                </th>
                <!-- <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Kinh nghiệm
                </th> -->
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Bằng cấp
                </th>
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th
                  class="px-2 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr
                v-for="(doctor, index) in doctorStore.doctors"
                :key="doctor.id"
                class="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200"
                :style="{
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff',
                }">
                <td class="px-2 md:px-4 py-3 whitespace-nowrap">
                  <div
                    class="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                    <span class="text-xs font-medium text-gray-700">{{
                      index + 1
                    }}</span>
                  </div>
                </td>
                <td class="px-2 md:px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8">
                      <div
                        class="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
                        <span class="text-white font-bold text-sm">{{
                          doctor.doctorName
                        }}</span>
                      </div>
                    </div>
                    <div class="ml-2 md:ml-3">
                      <div class="text-sm font-semibold text-gray-900">
                        {{ doctor.doctorName }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ doctor.email }}
                      </div>
                      <div class="text-xs text-gray-400">
                        {{ doctor.phone }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-2 md:px-4 py-3 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200"
                    >{{ doctor.specialtyName }}</span
                  >
                </td>
                <td
                  class="px-2 md:px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                  <div class="text-sm text-gray-900 font-medium">
                    {{ doctor.hospitalName }}
                  </div>
                </td>
                <!-- <td
                  class="px-2 md:px-4 py-3 whitespace-nowrap hidden md:table-cell">
                  <div class="flex items-center">
                    <div
                      class="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                    <span class="text-sm font-medium text-gray-900"
                      >{{ doctor.experience_years }} năm</span
                    >
                  </div>
                </td> -->
                <td
                  class="px-2 md:px-4 py-3 whitespace-nowrap hidden md:table-cell">
                  <span class="text-sm font-medium text-gray-900">{{
                    doctor.degree
                  }}</span>
                </td>
                <td class="px-2 md:px-4 py-3 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full border',
                      doctor.status === 'active'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : doctor.status === 'inactive'
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    ]">
                    {{
                      doctor.status === "active"
                        ? "Hoạt động"
                        : doctor.status === "inactive"
                        ? "Không hoạt động"
                        : "Chờ duyệt"
                    }}
                  </span>
                </td>
                <td class="px-2 md:px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-1 md:gap-2">
                    <button
                      @click="editDoctor(doctor)"
                      class="inline-flex items-center justify-center p-2 text-xs font-medium text-cyan-600 bg-cyan-50 rounded-md hover:bg-cyan-100 transition-colors duration-200">
                      <svg
                        class="w-4 h-4 md:mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      <span class="hidden md:inline">Sửa</span>
                    </button>
                    <button
                      @click="deleteDoctor(doctor.doctorID)"
                      class="inline-flex items-center justify-center p-2 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200">
                      <svg
                        class="w-4 h-4 md:mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <span class="hidden md:inline">Xóa</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Debug Info -->
        <div class="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm">
          Debug: Có {{ doctorStore.doctors.length }} bác sĩ được load
        </div>
        <!-- Empty State -->
        <div v-if="doctorStore.doctors.length === 0" class="text-center py-12">
          <div
            class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <svg
              class="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-base font-medium text-gray-900 mb-1">
            Không tìm thấy bác sĩ
          </h3>
          <p class="text-sm text-gray-500 mb-4">
            Thử thay đổi từ khóa tìm kiếm hoặc thêm bác sĩ mới.
          </p>
          <button
            @click="addNewDoctor"
            class="inline-flex items-center px-3 py-2 bg-cyan-500 text-white text-sm rounded-md hover:bg-cyan-600 transition-colors duration-200">
            <svg
              class="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Thêm bác sĩ đầu tiên
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f7fafc;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useDoctorStore } from "@/stores/getDoctorStore";

const keyword = ref("");
const doctorStore = useDoctorStore();
let searchTimeout = null; // Biến để debounce tìm kiếm

// Computed properties for statistics
const activeDoctors = computed(() => {
  return doctorStore.doctors.filter((doctor) => doctor.status === "active")
    .length;
});

const uniqueSpecialties = computed(() => {
  const specialties = new Set(
    doctorStore.doctors.map((doctor) => doctor.specialtyName)
  );
  return specialties.size;
});

const lastUpdated = computed(() => {
  return new Date().toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// Function xử lý tìm kiếm ngay lập tức với debounce
function handleSearchInput() {
  // Clear timeout cũ nếu có
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Đặt timeout mới để debounce (300ms)
  searchTimeout = setTimeout(() => {
    performSearch();
  }, 300);
}

// Function thực hiện tìm kiếm
async function performSearch() {
  try {
    // Nếu không có từ khóa, load lại tất cả bác sĩ
    if (!keyword.value.trim()) {
      await doctorStore.fetchDoctor();
      return;
    }

    // Nếu đã có dữ liệu bác sĩ, thực hiện filter
    if (doctorStore.doctors.length > 0) {
      filterDoctors();
    } else {
      // Nếu chưa có dữ liệu, load từ API trước
      await doctorStore.fetchDoctor();
      filterDoctors();
    }
  } catch (error) {
    console.error("Error performing search:", error);
  }
}

// Function filter bác sĩ theo từ khóa
function filterDoctors() {
  if (!keyword.value.trim()) {
    return; // Không làm gì nếu không có từ khóa
  }

  // Tách từ khóa thành các từ riêng biệt
  const keywords = keyword.value.toLowerCase().trim().split(/\s+/);

  const filteredDoctors = doctorStore.doctors.filter((doctor) => {
    // Tạo chuỗi tìm kiếm từ các trường thông tin
    const searchText = [
      doctor.doctorName || "",
      doctor.specialtyName || "",
      doctor.hospitalName || "",
      doctor.email || "",
      doctor.phone || "",
      doctor.degree || "",
      doctor.experience_years ? `${doctor.experience_years} năm` : "",
    ]
      .join(" ")
      .toLowerCase();

    // Kiểm tra xem tất cả các từ khóa có xuất hiện trong chuỗi tìm kiếm không
    return keywords.every((keyword) => searchText.includes(keyword));
  });

  // Cập nhật danh sách bác sĩ đã filter
  doctorStore.doctors = filteredDoctors;
  console.log("Filtered doctors:", filteredDoctors.length);
}

// Function xóa từ khóa tìm kiếm
async function clearSearch() {
  keyword.value = ""; // Clear từ khóa
  await doctorStore.fetchDoctor(); // Load lại tất cả bác sĩ
  console.log("Search cleared, loaded all doctors");
}

async function fetchDoctors() {
  try {
    await doctorStore.fetchDoctor();
    // Ensure doctors is always an array
    if (!Array.isArray(doctorStore.doctors)) {
      doctorStore.doctors = [];
    }

    // Nếu có từ khóa, thực hiện filter
    if (keyword.value.trim()) {
      filterDoctors();
    }

    console.log("Doctors loaded:", doctorStore.doctors.length);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    doctorStore.doctors = []; // Ensure we have an empty array on error
  }
}

function editDoctor(doctor) {
  // Mở modal hoặc redirect tới trang chỉnh sửa
  console.log("Edit:", doctor);
  alert(`Chỉnh sửa bác sĩ: ${doctor.full_name}`);
}

function addNewDoctor() {
  alert("Tính năng thêm bác sĩ mới sẽ được phát triển sau!");
}

async function deleteDoctor(id) {
  if (confirm("Bạn có chắc muốn xoá bác sĩ này?")) {
    // Xóa bác sĩ khỏi danh sách
    const index = doctorStore.doctors.findIndex((doctor) => doctor.id === id);
    if (index > -1) {
      doctorStore.doctors.splice(index, 1);
      alert("Đã xóa bác sĩ thành công!");
    }
  }
}

onMounted(() => {
  fetchDoctors();
  console.log("Component mounted, doctors count:", doctorStore.doctors.length);
});

// Cleanup timeout khi component unmount
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});
</script>
