<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Hồ sơ bệnh nhân</h2>
    <div class="flex flex-col p-1" v-if="user">
      <span class="p-2">
        <i class="fas fa-user"></i>
        <span> Họ và tên: {{ user.fullName }} </span>
      </span>
      <span class="p-2">
        <i class="fa-solid fa-envelope"></i>
        <span> Email: {{ user.email }} </span>
      </span>
      <span class="p-2">
        <i class="fas fa-birthday-cake"></i>
        <span> Ngày sinh: {{ formatDate(user.birthDate) }} </span>
      </span>
      <span class="p-2">
        <i class="fas fa-phone"></i>
        <span> Số điện thoại: {{ user.phone }} </span>
      </span>
      <span class="p-2">
        <i class="fas fa-venus-mars"></i>
        <span> Giới tính: {{ user.gender === "male" ? "Nam" : "Nữ" }} </span>
      </span>
      <span class="p-2">
        <i class="fas fa-map-marker-alt"></i>
        <span> Địa chỉ: {{ user.address }} </span>
      </span>
    </div>
    <div v-else class="text-gray-500">Không có dữ liệu hồ sơ.</div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
}

// Tự động fetch profile nếu chưa có
onMounted(async () => {
  if (!user.value) {
    try {
      await authStore.fetchUserProfile();
    } catch (error) {
      console.error("Không thể tải hồ sơ người dùng", error);
    }
  }
});
</script>
