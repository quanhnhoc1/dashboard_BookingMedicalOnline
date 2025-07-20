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
          <tr>
            <td>1</td>
            <td>Da liễu</td>
            <td>Khám BHYT</td>
            <td>
              06:30 - 07:30<br />
              21/07/2025
            </td>
            <td>Thanh toán tại Bệnh viện</td>
            <td>
              <i class="fas fa-trash-alt text-gray-400 cursor-pointer"></i>
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
            <span class="font-bold">MINH THÂN NGUYỄN</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Ngày sinh:</span>
            <span class="font-bold">02/02/1996</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Email:</span>
            <span class="font-bold">htna705@gmail.com</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Mã số BHYT:</span>
            <span class="font-bold">Chưa cập nhật</span>
          </div>
        </div>
        <div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Giới tính:</span>
            <span class="font-bold">Nam</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">CMND:</span>
            <span class="font-bold">094012231123</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Dân tộc:</span>
            <span class="font-bold">Kinh</span>
          </div>
          <div class="flex items-center mb-1">
            <span class="font-semibold w-28">Địa chỉ:</span>
            <span class="font-bold"
              >Nhà trọ Út Hồng, 171A/5 đường Vòng Cung, khu vực 5, Quận Ninh
              Kiều, Cần Thơ, Vietnam Thị trấn Cờ Đỏ Huyện Cờ Đỏ Thành phố Cần
              Thơ</span
            >
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
        @click="handleConfirm"
        class="text-blue-700 font-semibold flex items-center">
        <i class="fas fa-arrow-left mr-1"></i> Quay lại
      </button>
      <button
        @click="handleConfirm"
        class="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-8 rounded">
        Xác nhận
      </button>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useDoctorStore } from "@/stores/getDoctorStore";
import { userHospitalsStore } from "@/stores/getHospitalsStore";

const route = useRoute();
const userStore = useUserStore();
const doctorStore = useDoctorStore();
const hospitalsStore = userHospitalsStore();

const profileID = route.query.profileID;
const scheduleID = route.query.scheduleID;
onMounted(async () => {
  if (profileID) {
    await userStore.getUserProfileDetailStore(profileID);
  }
});

function handleConfirm() {
  const selectedDate = doctorStore.selectedDate;
  const scheduleID = doctorStore.scheduleID[selectedDate];
  const hospitalID =
    hospitalsStore.selectedHospital?.ID ||
    hospitalsStore.selectedHospital?.CODE;
  // const profileID = route.params.profileID;

  console.log(
    `Schedule ID đã chọn: ${scheduleID}\n` +
      `Selected hospital ID: ${hospitalID}\n` +
      `Selected profile ID: ${profileID}`
  );
}
</script>
