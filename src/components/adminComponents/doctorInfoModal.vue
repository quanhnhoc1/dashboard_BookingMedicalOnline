<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-3">
          <div
            class="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
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
          Thông tin bác sĩ
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <svg
            class="w-6 h-6"
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

      <!-- Content -->
      <div class="p-6">
        <div v-if="doctor" class="space-y-6">
          <!-- Avatar và thông tin cơ bản -->
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">{{
                  getInitials(doctor.doctorName)
                }}</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ doctor.doctorName }}
              </h3>
              <div class="flex flex-wrap gap-2 mb-3">
                <span
                  class="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                  {{ doctor.specialtyName }}
                </span>
                <span
                  :class="[
                    'inline-flex px-3 py-1 text-sm font-semibold rounded-full border',
                    doctor.status === 'active'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : doctor.status === 'inactive'
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-yellow-100 text-yellow-800 border-yellow-200',
                  ]">
                  {{ getStatusText(doctor.status) }}
                </span>
              </div>
              <p class="text-gray-600">{{ doctor.hospitalName }}</p>
            </div>
          </div>

          <!-- Thông tin chi tiết -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Thông tin liên hệ -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-gray-900 border-b pb-2">
                Thông tin liên hệ
              </h4>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Email</p>
                    <p class="text-gray-900">{{ doctor.email }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">
                      Số điện thoại
                    </p>
                    <p class="text-gray-900">{{ doctor.phone }}</p>
                  </div>
                </div>
                <div
                  v-if="getDoctorAddress(doctor)"
                  class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      class="w-4 h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-500">Địa chỉ</p>
                    <p class="text-gray-900 leading-relaxed">
                      {{ getDoctorAddress(doctor) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Thông tin chuyên môn -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-gray-900 border-b pb-2">
                Thông tin chuyên môn
              </h4>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-purple-600"
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
                  <div>
                    <p class="text-sm font-medium text-gray-500">Bằng cấp</p>
                    <p class="text-gray-900">{{ doctor.degree }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Kinh nghiệm</p>
                    <p class="text-gray-900">
                      {{ doctor.experience_years || 0 }} năm
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-indigo-600"
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
                  <div>
                    <p class="text-sm font-medium text-gray-500">Bệnh viện</p>
                    <p class="text-gray-900">{{ doctor.hospitalName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mô tả và ghi chú -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-if="doctor.description" class="space-y-3">
              <h4 class="text-lg font-semibold text-gray-900 border-b pb-2">
                Mô tả
              </h4>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-gray-700 leading-relaxed">
                  {{ doctor.description }}
                </p>
              </div>
            </div>
            <div v-if="doctor.notes" class="space-y-3">
              <h4 class="text-lg font-semibold text-gray-900 border-b pb-2">
                Ghi chú
              </h4>
              <div class="bg-yellow-50 rounded-lg p-4">
                <p class="text-gray-700 leading-relaxed">{{ doctor.notes }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-else-if="loading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div
              class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600">Đang tải thông tin bác sĩ...</p>
          </div>
        </div>

        <!-- Error state -->
        <div v-else class="text-center py-12">
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy thông tin
          </h3>
          <p class="text-gray-600">Không thể tải thông tin bác sĩ</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200">
        <button
          @click="closeModal"
          class="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg transition-colors duration-200">
          Đóng
        </button>
        <button
          @click="editDoctor"
          class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200">
          Chỉnh sửa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: Boolean,
  doctor: Object,
  loading: Boolean,
});

const emit = defineEmits(["close", "edit"]);

function closeModal() {
  emit("close");
}

function editDoctor() {
  emit("edit", props.doctor);
}

function getInitials(name) {
  if (!name) return "BS";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusText(status) {
  switch (status) {
    case "active":
      return "Hoạt động";
    case "inactive":
      return "Không hoạt động";
    case "pending":
      return "Chờ duyệt";
    default:
      return "Không xác định";
  }
}

// Function để lấy địa chỉ bác sĩ từ nhiều trường hợp có thể có
function getDoctorAddress(doctor) {
  if (!doctor) return null;

  // Thử tất cả các trường hợp có thể có của địa chỉ
  const address =
    doctor.ADDRESS ||
    doctor.address ||
    doctor.Address ||
    doctor.ADDRESS_LINE ||
    doctor.addressLine;

  return address || null;
}

// Debug function để kiểm tra dữ liệu bác sĩ
function debugDoctorData() {
  if (props.doctor) {
    console.log("Doctor data:", props.doctor);
    console.log("Doctor keys:", Object.keys(props.doctor));
    console.log("Doctor ADDRESS:", props.doctor.ADDRESS);
    console.log("Doctor address:", props.doctor.address);
    console.log(
      "Doctor address (any case):",
      props.doctor.address || props.doctor.ADDRESS || props.doctor.Address
    );
    console.log("getDoctorAddress result:", getDoctorAddress(props.doctor));
  }
}

// Gọi debug function khi component mount
debugDoctorData();
</script>

<style scoped>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 48rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
    margin: 0.5rem;
  }
}
</style>
