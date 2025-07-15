<template>
  <div class="min-h-screen flex flex-col mx-auto bg-blue-50">
    <BreadCum />
    <div class="flex flex-col items-center min-h-screen bg-blue-50 py-8">
      <h1 class="text-4xl font-bold text-cyan-500 mb-8">
        Chọn hồ sơ bệnh nhân
      </h1>
      <div
        class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl cursor-pointer"
        @click="showActions = !showActions">
        <div class="flex items-center mb-4 cursor-pointer">
          <i class="fa-solid fa-user text-cyan-400 mr-2"></i>
          <!-- <span class="material-icons text-cyan-400 mr-2">person</span> -->
          <span class="font-bold text-cyan-500 text-lg">{{
            user.fullName
          }}</span>
        </div>
        <div class="mb-2 flex items-center">
          <i class="fa-solid fa-cake-candles text-cyan-500 mr-2"></i>
          <!-- <span class="material-icons text-gray-400 mr-2">calendar_today</span> -->
          <span class="font-semibold">Ngày sinh:</span>
          <span class="ml-2">{{ formatDate(user.birthDate) }}</span>
        </div>
        <div class="mb-2 flex items-center">
          <i class="fa-solid fa-phone text-cyan-400 mr-2"> </i>
          <!-- <span class="material-icons text-gray-400 mr-2">phone</span> -->
          <span class="font-semibold">Số điện thoại:</span>
          <span class="ml-2"
            >{{ user.phone || "chưa cập nhật số điện thoại  " }}
          </span>
        </div>
        <div class="mb-2 flex items-start">
          <!-- <span class="material-icons text-gray-400 mr-2 mt-1">home</span> -->
          <i class="fa-solid fa-location-dot text-cyan-400 mr-2 mt-1"></i>
          <span class="font-semibold">Địa chỉ:</span>
          <p class="ml-2 flex-1">
            {{ user.address }}
          </p>
        </div>
        <div class="mb-4 flex items-center">
          <!-- <span class="material-icons text-gray-400 mr-2">email</span> -->
          <i class="fa-solid fa-envelope text-cyan-400 mr-2"></i>
          <span class="font-semibold">Địa chỉ email:</span>
          <span class="ml-2">{{ user.email }}</span>
        </div>
        <div v-if="showActions" class="flex justify-between mt-6">
          <button
            class="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg flex-1 mr-2 hover:bg-pink-200"
            @click.stop="handleDelete">
            Xóa
          </button>
          <button
            class="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg flex-1 mr-2 hover:bg-blue-200">
            Sửa
          </button>
          <button
            class="bg-cyan-500 text-white px-4 py-2 rounded-lg flex-1 hover:bg-cyan-600">
            Tiếp tục <i class="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
        <div v-else class="flex justify-between mt-6">
          <button
            class="flex items-center text-black-500 hover:bg-cyan-600 p-2 rounded-full">
            <i class="fa-solid fa-arrow-left mr-2"></i>
            <p class="group-hover:text-cyan-500">Quay lại</p>
          </button>
          <button
            class="flex items-center bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600">
            <i class="fa-solid fa-user-plus text-cyan-500"></i>
            Thêm hồ sơ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import BreadCum from "@/components/breadcrumb.vue";
import { useAuthStore } from "@/stores/authStore";
const getProfile = useAuthStore();
const user = getProfile.user;
const showActions = ref(false);
const handleDelete = () => {
  Swal.fire({
    title: "Bạn chắc chắn muốn xóa hồ sơ này?",
    // text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e53e3e", // đỏ
    cancelButtonColor: "#3085d6", // xanh
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      showActions.value = true;
      Swal.fire("Đã xóa!", "Hồ sơ đã được xóa.", "success");
    }
  });
};
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
}
</script>

<style lang="scss" scoped></style>
