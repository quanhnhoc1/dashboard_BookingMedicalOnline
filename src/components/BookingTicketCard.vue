<template>
  <div class="space-y-4">
    <!-- <h3 class="text-lg font-semibold text-gray-800">Danh sách phiếu đã hủy</h3> -->

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-4">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Đang tải dữ liệu...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="listBookingTicket.length === 0" class="text-center py-8">
      <i class="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
      <p class="text-gray-600">Chưa có phiếu khám nào</p>
    </div>

    <!-- List of cancelled tickets -->
    <div v-else class="space-y-4">
      <div
        v-for="ticket in listBookingTicket"
        :key="ticket.ID"
        @click="selectTicket(ticket.ID)"
        class="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500 cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <!-- Header with ID and Status -->
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-sm text-gray-600">
              Mã phiếu:
              <span class="font-semibold text-gray-800">#{{ ticket.ID }}</span>
            </p>
          </div>
          <span
            class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Đã đặt khám
          </span>
        </div>

        <!-- Patient Name -->
        <div class="mb-4">
          <p class="font-bold text-gray-800 text-lg uppercase">
            {{ ticket.FULL_NAME }}
          </p>
        </div>

        <!-- Appointment Details -->
        <div class="border-t border-dotted border-gray-300 pt-4 space-y-3">
          <!-- Hospital -->
          <div class="flex items-center">
            <i class="fas fa-hospital text-blue-500 mr-3 w-5"></i>
            <span class="text-blue-600 font-bold">{{
              ticket.HOSPITALNAME
            }}</span>
          </div>

          <!-- Doctor -->
          <div class="flex items-center">
            <i class="fas fa-user-md text-green-500 mr-3 w-5"></i>
            <span class="text-gray-700"
              >Bác sĩ:
              <span class="font-medium">{{ ticket.DOCTOR_NAME }}</span></span
            >
          </div>

          <!-- Specialty -->
          <div class="flex items-center">
            <i class="fas fa-stethoscope text-orange-500 mr-3 w-5"></i>
            <span class="text-gray-700"
              >Chuyên khoa:
              <span class="font-medium">{{ ticket.SPECITALTYNAME }}</span></span
            >
          </div>

          <!-- Date -->
          <div class="flex items-center">
            <i class="fas fa-calendar text-orange-500 mr-3 w-5"></i>
            <span class="text-gray-700"
              >Ngày khám:
              <span class="font-medium">{{
                formatDate(ticket.DATE_OF_MONTH)
              }}</span></span
            >
          </div>

          <!-- Time -->
          <div class="flex items-center">
            <i class="fas fa-clock text-orange-500 mr-3 w-5"></i>
            <span class="text-gray-700"
              >Giờ khám:
              <span class="font-medium"
                >{{ formatTime(ticket.START_TIME) }} -
                {{ formatTime(ticket.END_TIME) }}</span
              ></span
            >
          </div>

          <!-- Price -->
          <div class="flex items-center">
            <i class="fas fa-money-bill text-green-500 mr-3 w-5"></i>
            <span class="text-gray-700"
              >Phí khám:
              <span class="font-medium">{{
                formatPrice(ticket.PRICES_DOCTOR)
              }}</span></span
            >
          </div>
        </div>

        <!-- Cancel Button (only show when ticket is selected) -->
        <div
          v-if="selectedTicketId === ticket.ID"
          class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600">Bạn có muốn hủy lịch khám này?</p>
            <div class="flex space-x-2">
              <button
                @click.stop="cancelAppointment(ticket.ID)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                <i class="fas fa-times mr-2"></i>
                Hủy lịch
              </button>
              <button
                @click.stop="deselectTicket"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import {
  getListBookingTicketService,
  cancelAppointmentService,
} from "../services/userServices";
import Swal from "sweetalert2";

const userStore = useUserStore();
const loading = ref(false);
const selectedTicketId = ref(null); // Theo dõi vé nào đang được chọn

// Lấy dữ liệu từ store (nếu đã có)
const listBookingTicket = computed(() => userStore.bookingTickets || []);

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "Chưa cập nhật";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const formatTime = (timeString) => {
  if (!timeString) return "Chưa cập nhật";
  const date = new Date(timeString);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (price) => {
  if (!price) return "Chưa cập nhật";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// Chọn vé để hiển thị nút hủy
const selectTicket = (ticketId) => {
  if (selectedTicketId.value === ticketId) {
    // Nếu click vào vé đã chọn thì bỏ chọn
    selectedTicketId.value = null;
  } else {
    // Chọn vé mới
    selectedTicketId.value = ticketId;
  }
};

// Bỏ chọn vé
const deselectTicket = () => {
  selectedTicketId.value = null;
};

// Hủy lịch khám
const cancelAppointment = async (ticketId) => {
  try {
    // Tìm thông tin vé được chọn
    const selectedTicket = listBookingTicket.value.find(
      (ticket) => ticket.ID === ticketId
    );

    // Hiển thị confirm dialog với SweetAlert
    const result = await Swal.fire({
      title: "Xác nhận hủy lịch khám",
      text: "Bạn có chắc chắn muốn hủy lịch khám này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có, hủy lịch!",
      cancelButtonText: "Không, giữ lại",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const appointmentData = {
        userProfileID: selectedTicket.ID_PROFILE,
        doctorID: selectedTicket.DOCTOR_ID,
        scheduleID: selectedTicket.ID || null,
      };

      // Gọi API hủy lịch
      const response = await cancelAppointmentService(appointmentData);

      if (response.success) {
        await loadCancelledTickets();
        selectedTicketId.value = null;

        // Hiển thị thông báo thành công
        await Swal.fire({
          title: "Thành công!",
          text: "Đã hủy lịch khám thành công!",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
      } else {
        // Hiển thị thông báo lỗi chi tiết
        const errorMessage =
          response.message || "Có lỗi xảy ra khi hủy lịch khám";

        await Swal.fire({
          title: "Lỗi!",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#ef4444",
        });

        console.error("Cancel appointment failed:", response);
      }
    }
  } catch (error) {
    console.error("Lỗi khi hủy lịch khám:", error);

    await Swal.fire({
      title: "Lỗi!",
      text: "Có lỗi xảy ra khi hủy lịch khám: " + error,
      icon: "error",
      confirmButtonColor: "#ef4444",
    });
  }
};

// Gọi API để lấy dữ liệu
const loadCancelledTickets = async () => {
  loading.value = true;
  try {
    const tickets = await getListBookingTicketService("pending");
    userStore.setBookingTickets(tickets); // Chỉ gọi action, không gán kết quả
    console.log("Cancelled tickets loaded:", tickets); // Log dữ liệu trực tiếp
    console.log(
      "Ticket IDs:",
      tickets.map((ticket) => ticket.ID)
    );

    // console.log("Store tickets:", listBookingTicket.value.ID); // Log từ computed
  } catch (error) {
    console.error("Error loading cancelled tickets:", error);

    // Hiển thị thông báo lỗi khi tải dữ liệu
    await Swal.fire({
      title: "Lỗi tải dữ liệu!",
      text: "Không thể tải danh sách phiếu khám. Vui lòng thử lại sau.",
      icon: "error",
      confirmButtonColor: "#ef4444",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadCancelledTickets();
});

console.log("Current booking tickets:", listBookingTicket.value);
</script>
