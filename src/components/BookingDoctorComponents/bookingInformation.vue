<template>
  <div class="space-y-4">
    <!-- Xác nhận thông tin khám -->
    <div class="bg-cyan-100 rounded-lg p-4 shadow">
      <h2 class="font-bold text-lg text-cyan-900 mb-2">
        Xác nhận thông tin tin khám
      </h2>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b">
            <th class="py-1">#</th>
            <th class="py-1">Chuyên khoa</th>
            <th class="py-1">Dịch vụ</th>
            <th class="py-1">Thời gian khám</th>
            <th class="py-1">Tiền khám</th>
            <th class="py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="appointmentInfo">
            <td>1</td>
            <td>{{ selectedSpecialty.SpecialtyName }}</td>
            <td>{{ userProfile.BHYT_CODE ? "Khám BHYT" : "Khám dịch vụ" }}</td>
            <td>
              {{ appointmentInfo.appointmentTime.start }} -
              {{ appointmentInfo.appointmentTime.end }}<br />
              {{ formatDateForDisplay(appointmentInfo.selectedDate) }}
            </td>
            <td>Thanh toán tại Bệnh viện</td>
            <td>
              <i class="fas fa-trash-alt text-gray-400 cursor-pointer"></i>
            </td>
          </tr>
          <tr v-else>
            <td colspan="6" class="text-center py-4">
              Vui lòng chọn lịch khám trước.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Thông tin bệnh nhân -->
    <div class="bg-cyan-100 rounded-lg p-4 shadow">
      <h2 class="font-bold text-lg text-cyan-900 mb-2">Thông tin bệnh nhân</h2>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Họ và tên:</span>
            <span class="font-bold">{{ userProfile.FULL_NAME }}</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Ngày sinh:</span>
            <span class="font-bold">{{
              formatDate(userProfile.BIRTH_DATE)
            }}</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Email:</span>
            <span class="font-bold">{{
              userProfile.EMAIL || "Chưa cập nhật"
            }}</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Mã số BHYT:</span>
            <span class="font-bold">{{
              userProfile.BHYT_CODE || "Chưa cập nhật"
            }}</span>
          </div>
        </div>
        <div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Giới tính:</span>
            <span class="font-bold">{{
              userProfile.GENDER === "male"
                ? "Nam"
                : userProfile.GENDER === "female"
                ? "Nữ"
                : "Khác"
            }}</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">CMND:</span>
            <span class="font-bold">{{
              userProfile.ID_CARD || "Chưa cập nhật"
            }}</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Dân tộc:</span>
            <span class="font-bold">{{ userProfile.ETHNIC || "Kinh" }}</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Địa chỉ:</span>
            <span class="font-bold">{{
              userProfile.ADDRESS || "Chưa cập nhật"
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="mt-3 bg-red-100 text-red-600 rounded p-2 text-xs flex items-center">
        <i class="fas fa-exclamation-circle mr-2"></i>
        Trong thời gian quy định, nếu quý khách huỷ phiếu khám sẽ được hoàn lại
        tiền khám và các dịch vụ đặt thêm (không bao gồm phí tiện ích).
      </div>
    </div>

    <!-- Nút xác nhận -->
    <div class="flex justify-between items-center mt-4">
      <button
        @click="$router.back()"
        class="text-blue-700 font-semibold flex items-center">
        <i class="fas fa-arrow-left mr-1"></i> Quay lại
      </button>
      <button
        @click="handleConfirm"
        :disabled="isLoading"
        class="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-8 rounded">
        <span v-if="isLoading">Đang xử lý...</span>
        <span v-else>Xác nhận</span>
      </button>
    </div>
    <div v-if="successMsg" class="mt-2 text-green-600 font-semibold">
      {{ successMsg }}
    </div>
    <div v-if="errorMsg" class="mt-2 text-red-600 font-semibold">
      {{ errorMsg }}
    </div>
  </div>
</template>
<script setup>
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { onMounted, computed, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useDoctorStore } from "@/stores/getDoctorStore";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
// import UserProfile from "@/pages/user/UserProfile.vue";
const selectedSpecialty = computed(() => hospitalsStore.selectedSpecialty);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const doctorStore = useDoctorStore();
const hospitalsStore = userHospitalsStore();
const userProfile = computed(() => userStore.UserProfileDetail.data || {});
const appointmentInfo = computed(() => doctorStore.appointmentInfo);
const profileID = route.query.profileID;
const scheduleID = route.query.scheduleID;
const doctorID = computed(
  () =>
    appointmentInfo.value?.doctorID ||
    appointmentInfo.value?.doctorId ||
    appointmentInfo.value?.DoctorID
);

// Thêm biến trạng thái
const isLoading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

onMounted(async () => {
  if (profileID) {
    await userStore.getUserProfileDetailStore(profileID);
    // console.log("UserProfileDetail:", userStore.UserProfileDetail);
  }
});

async function handleConfirm() {
  errorMsg.value = "";
  successMsg.value = "";
  if (!profileID || !doctorID.value || !scheduleID) {
    errorMsg.value = "Thiếu thông tin đặt lịch!";
    return;
  }
  isLoading.value = true;
  try {
    const result = await userStore.addNewAppointment({
      profileID: Number(profileID),
      doctorID: Number(doctorID.value),
      scheduleID: Number(scheduleID),
    });
    Swal.fire({
      icon: "success",
      title: "Đặt lịch thành công!",
      text: "Đặt lịch thành công!",
    });
    // Có thể chuyển trang hoặc reset form tại đây nếu muốn
    // router.push({ name: "PhieuKhamBenh" });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Đặt lịch thất bại!",
      text: err || "Đặt lịch thất bại!",
    });
  } finally {
    isLoading.value = false;
  }
}

function formatDateForDisplay(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
}
</script>
