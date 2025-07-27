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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            Quản lý lịch làm việc
          </h1>
          <p class="text-xs md:text-sm text-gray-600 mt-1">
            Thêm và quản lý lịch làm việc cho các bác sĩ
          </p>
        </div>
        <div class="flex gap-4">
          <div class="text-center">
            <span class="block text-2xl font-bold text-gray-900">{{
              totalDoctors
            }}</span>
            <span class="text-xs text-gray-600">Bác sĩ</span>
          </div>
          <div class="text-center">
            <span class="block text-2xl font-bold text-gray-900">{{
              totalSchedules
            }}</span>
            <span class="text-xs text-gray-600">Lịch làm việc</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div
      class="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6 flex-shrink-0">
      <div class="flex overflow-x-auto whitespace-nowrap">
        <button
          class="px-4 md:px-6 py-2 md:py-3 border-b-2 border-transparent text-gray-600 font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:text-blue-500 flex items-center gap-2"
          :class="{
            'text-blue-500 border-blue-500': activeTab === 'schedule-form',
          }"
          @click="activeTab = 'schedule-form'">
          <i class="fas fa-plus text-sm md:text-lg"></i>
          <span class="hidden sm:inline">Thêm Lịch Làm Việc</span>
          <span class="sm:hidden">Thêm</span>
        </button>
        <button
          class="px-4 md:px-6 py-2 md:py-3 border-b-2 border-transparent text-gray-600 font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:text-blue-500 flex items-center gap-2"
          :class="{
            'text-blue-500 border-blue-500': activeTab === 'schedule-list',
          }"
          @click="activeTab = 'schedule-list'">
          <i class="fas fa-calendar-alt text-sm md:text-lg"></i>
          <span class="hidden sm:inline">Xem Tất Cả Lịch</span>
          <span class="sm:hidden">Lịch</span>
        </button>
        <button
          class="px-4 md:px-6 py-2 md:py-3 border-b-2 border-transparent text-gray-600 font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:text-blue-500 flex items-center gap-2"
          :class="{
            'text-blue-500 border-blue-500': activeTab === 'doctor-list',
          }"
          @click="activeTab = 'doctor-list'">
          <i class="fas fa-user-md text-sm md:text-lg"></i>
          <span class="hidden sm:inline">Danh Sách Bác Sĩ</span>
          <span class="sm:hidden">Bác sĩ</span>
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 min-h-0 flex flex-col">
      <!-- Tab 1: Thêm lịch làm việc -->
      <div
        v-if="activeTab === 'schedule-form'"
        class="bg-white rounded-lg shadow-md overflow-hidden flex-1 min-h-0">
        <ScheduleForm />
      </div>

      <!-- Tab 2: Xem tất cả lịch -->
      <div
        v-if="activeTab === 'schedule-list'"
        class="bg-white rounded-lg shadow-md overflow-hidden flex-1 min-h-0 flex flex-col">
        <div
          class="px-2 md:px-4 py-2 md:py-3 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 class="text-lg md:text-xl font-bold text-gray-900">
              Tổng Quan Lịch Làm Việc
            </h2>
            <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <select
                v-model="selectedMonth"
                class="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none">
                <option value="">Tất cả tháng</option>
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
                <option value="4">Tháng 4</option>
                <option value="5">Tháng 5</option>
                <option value="6">Tháng 6</option>
                <option value="7">Tháng 7</option>
                <option value="8">Tháng 8</option>
                <option value="9">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>
              </select>
              <select
                v-model="selectedSpecialty"
                class="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none">
                <option value="">Tất cả chuyên khoa</option>
                <option value="Tim mạch">Tim mạch</option>
                <option value="Nhi khoa">Nhi khoa</option>
                <option value="Thần kinh">Thần kinh</option>
                <option value="Da liễu">Da liễu</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Enhanced Scrollable Content -->
        <div class="flex-1 min-h-0 relative">
          <div class="h-full overflow-hidden">
            <div
              class="h-full overflow-y-auto overflow-x-auto custom-scrollbar p-4 md:p-6"
              style="max-height: calc(100vh - 400px)">
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div
                  v-for="schedule in filteredSchedules"
                  :key="schedule.id"
                  class="bg-gray-50 rounded-lg p-4 md:p-5 border-l-4 border-green-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer"
                  @click="editSchedule(schedule.id)">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                        <span class="text-white font-bold text-sm">{{
                          schedule.doctorName.charAt(0)
                        }}</span>
                      </div>
                      <div>
                        <h4
                          class="font-semibold text-gray-800 text-sm md:text-base group-hover:text-blue-600 transition-colors duration-200">
                          {{ schedule.doctorName }}
                        </h4>
                        <span
                          class="text-blue-600 text-xs md:text-sm font-medium">
                          {{ schedule.specialty }}
                        </span>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="block font-semibold text-gray-800 text-sm">
                        {{ formatDate(schedule.date) }}
                      </span>
                      <span class="text-xs text-gray-500">
                        {{ getDayOfWeek(schedule.date) }}
                      </span>
                    </div>
                  </div>
                  <div class="mb-4 space-y-2">
                    <div
                      class="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <i class="fas fa-clock text-blue-500"></i>
                      <span
                        >{{ schedule.startTime }} - {{ schedule.endTime }}</span
                      >
                    </div>
                    <div
                      v-if="schedule.lunchBreak"
                      class="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <i class="fas fa-utensils text-orange-500"></i>
                      <span
                        >Nghỉ trưa: {{ schedule.lunchStart }} -
                        {{ schedule.lunchEnd }}</span
                      >
                    </div>
                    <div
                      v-if="schedule.notes"
                      class="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <i class="fas fa-sticky-note text-yellow-500"></i>
                      <span>{{ schedule.notes }}</span>
                    </div>
                  </div>
                  <div
                    class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      class="p-2 bg-yellow-500 text-gray-800 rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-yellow-600 hover:shadow-md transform hover:-translate-y-0.5"
                      @click.stop="editSchedule(schedule.id)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="p-2 bg-red-500 text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-red-600 hover:shadow-md transform hover:-translate-y-0.5"
                      @click.stop="deleteSchedule(schedule.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div
                v-if="filteredSchedules.length === 0"
                class="text-center py-12">
                <div
                  class="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3">
                  <svg
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 class="text-base font-medium text-gray-900 mb-1">
                  Không tìm thấy lịch làm việc
                </h3>
                <p class="text-sm text-gray-500">
                  Thử thay đổi bộ lọc hoặc thêm lịch mới.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Danh sách bác sĩ -->
      <div
        v-if="activeTab === 'doctor-list'"
        class="bg-white rounded-lg shadow-md overflow-hidden flex-1 min-h-0 flex flex-col">
        <div
          class="px-2 md:px-4 py-2 md:py-3 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 class="text-lg md:text-xl font-bold text-gray-900">
              Danh Sách Bác Sĩ
            </h2>
            <div class="relative w-full md:w-80">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Tìm kiếm bác sĩ..."
                class="w-full px-4 py-2 md:py-3 pr-10 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
              <i
                class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        <!-- Enhanced Scrollable Content -->
        <div class="flex-1 min-h-0 relative">
          <div class="h-full overflow-hidden">
            <div
              class="h-full overflow-y-auto overflow-x-auto custom-scrollbar p-4 md:p-6"
              style="max-height: calc(100vh - 400px)">
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div
                  v-for="doctor in filteredDoctors"
                  :key="doctor.id"
                  class="bg-white rounded-lg p-4 md:p-5 shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-transparent hover:border-blue-500 group"
                  @click="selectDoctor(doctor.id)">
                  <div class="relative mb-4">
                    <div
                      class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                      <span class="text-white font-bold text-lg md:text-xl">{{
                        doctor.name.charAt(0)
                      }}</span>
                    </div>
                    <div
                      class="absolute bottom-1 right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white flex items-center justify-center">
                      <i
                        class="fas fa-circle text-xs"
                        :class="
                          doctor.status === 'online'
                            ? 'text-green-500'
                            : 'text-red-500'
                        "></i>
                    </div>
                  </div>
                  <div class="mb-4">
                    <h4
                      class="font-semibold text-gray-800 text-base md:text-lg mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {{ doctor.name }}
                    </h4>
                    <p
                      class="text-blue-600 font-medium mb-1 text-sm md:text-base">
                      {{ doctor.specialty }}
                    </p>
                    <p class="text-gray-600 text-xs md:text-sm mb-3">
                      {{ doctor.experience }} năm kinh nghiệm
                    </p>
                    <div
                      class="bg-gray-50 px-3 py-2 rounded-lg text-center mb-4">
                      <span
                        class="text-blue-600 font-semibold text-xs md:text-sm">
                        {{ doctor.scheduleCount }} lịch làm việc
                      </span>
                    </div>
                  </div>
                  <div class="text-center">
                    <button
                      class="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      @click.stop="viewSchedules(doctor.id)">
                      <i class="fas fa-calendar"></i>
                      <span class="hidden sm:inline">Xem lịch</span>
                      <span class="sm:hidden">Lịch</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div
                v-if="filteredDoctors.length === 0"
                class="text-center py-12">
                <div
                  class="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3">
                  <svg
                    class="w-8 h-8 text-gray-400"
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
                <h3 class="text-base font-medium text-gray-900 mb-1">
                  Không tìm thấy bác sĩ
                </h3>
                <p class="text-sm text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ScheduleForm from "@/components/adminComponents/adminSchedules/ScheduleForm.vue";

// Reactive data
const activeTab = ref("schedule-form");
const selectedMonth = ref("");
const selectedSpecialty = ref("");
const searchQuery = ref("");

const doctors = ref([
  {
    id: 1,
    name: "Dr. Nguyễn Văn An",
    specialty: "Tim mạch",
    experience: 15,
    avatar: "/avatars/doctor1.jpg",
    status: "online",
    scheduleCount: 5,
  },
  {
    id: 2,
    name: "Dr. Trần Thị Bình",
    specialty: "Nhi khoa",
    experience: 12,
    avatar: "/avatars/doctor2.jpg",
    status: "offline",
    scheduleCount: 3,
  },
  {
    id: 3,
    name: "Dr. Lê Văn Cường",
    specialty: "Thần kinh",
    experience: 20,
    avatar: "/avatars/doctor3.jpg",
    status: "online",
    scheduleCount: 7,
  },
  {
    id: 4,
    name: "Dr. Phạm Thị Dung",
    specialty: "Da liễu",
    experience: 10,
    avatar: "/avatars/doctor4.jpg",
    status: "offline",
    scheduleCount: 2,
  },
]);

const schedules = ref([
  {
    id: 1,
    doctorId: 1,
    doctorName: "Dr. Nguyễn Văn An",
    doctorAvatar: "/avatars/doctor1.jpg",
    specialty: "Tim mạch",
    date: "2024-01-15",
    startTime: "08:00",
    endTime: "17:00",
    lunchBreak: true,
    lunchStart: "12:00",
    lunchEnd: "13:00",
    notes: "Khám bệnh tim mạch",
  },
  {
    id: 2,
    doctorId: 2,
    doctorName: "Dr. Trần Thị Bình",
    doctorAvatar: "/avatars/doctor2.jpg",
    specialty: "Nhi khoa",
    date: "2024-01-16",
    startTime: "09:00",
    endTime: "18:00",
    lunchBreak: false,
    notes: "Khám nhi khoa",
  },
]);

// Computed properties
const totalDoctors = computed(() => doctors.value.length);
const totalSchedules = computed(() => schedules.value.length);

const filteredSchedules = computed(() => {
  let filtered = schedules.value;

  if (selectedMonth.value) {
    filtered = filtered.filter((schedule) => {
      const month = new Date(schedule.date).getMonth() + 1;
      return month == selectedMonth.value;
    });
  }

  if (selectedSpecialty.value) {
    filtered = filtered.filter(
      (schedule) => schedule.specialty === selectedSpecialty.value
    );
  }

  return filtered;
});

const filteredDoctors = computed(() => {
  if (!searchQuery.value) return doctors.value;

  return doctors.value.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  return days[date.getDay()];
};

const editSchedule = (scheduleId) => {
  console.log("Chỉnh sửa lịch:", scheduleId);
  activeTab.value = "schedule-form";
};

const deleteSchedule = (scheduleId) => {
  if (confirm("Bạn có chắc chắn muốn xóa lịch làm việc này?")) {
    schedules.value = schedules.value.filter((s) => s.id !== scheduleId);
    alert("Xóa lịch làm việc thành công!");
  }
};

const selectDoctor = (doctorId) => {
  console.log("Chọn bác sĩ:", doctorId);
};

const viewSchedules = (doctorId) => {
  console.log("Xem lịch của bác sĩ:", doctorId);
  activeTab.value = "schedule-list";
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

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Enhanced card animations */
.group:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
}
</style>
