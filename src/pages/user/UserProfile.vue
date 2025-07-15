<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Danh sách hồ sơ bệnh nhân</h2>
    <div
      v-for="profile in profiles"
      :key="profile.id"
      class="bg-white rounded-xl shadow p-4 mb-4 border">
      <div class="mb-2 flex items-center">
        <i class="fas fa-user text-cyan-500 mr-2"></i>
        <span class="font-bold text-cyan-600 text-lg">{{
          profile.fullName
        }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-birthday-cake text-cyan-500 mr-2"></i>
        <span class="font-semibold">Ngày sinh:</span>
        <span class="ml-2">{{ formatDate(profile.birthDate) }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-phone text-cyan-500 mr-2"></i>
        <span class="font-semibold">Số điện thoại:</span>
        <span class="ml-2">{{ maskPhone(profile.phone) }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-venus-mars text-cyan-500 mr-2"></i>
        <span class="font-semibold">Giới tính:</span>
        <span class="ml-2">{{ profile.gender === "male" ? "Nam" : "Nữ" }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-map-marker-alt text-cyan-500 mr-2"></i>
        <span class="font-semibold">Địa chỉ:</span>
        <span class="ml-2 flex-1">{{ profile.address }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-users text-cyan-500 mr-2"></i>
        <span class="font-semibold">Dân tộc:</span>
        <span class="ml-2">{{ profile.ethnic || "Kinh" }}</span>
      </div>
      <div class="flex gap-4 mt-2">
        <button class="flex items-center text-red-500 hover:underline">
          <i class="fas fa-trash-alt mr-1"></i> Xóa hồ sơ
        </button>
        <button
          class="flex items-center text-blue-500 hover:underline"
          @click="gotoEditProfile">
          <i class="fas fa-edit mr-1"></i> Sửa hồ sơ
        </button>
        <button
          class="flex items-center text-gray-500 hover:underline"
          @click="openDetail(profile)">
          <i class="fas fa-info-circle mr-1"></i> Chi tiết
        </button>
      </div>
    </div>

    <!-- Modal chi tiết hồ sơ -->
    <modalProfile
      :showDetail="showDetail"
      :detailProfile="detailProfile"
      :closeDetail="closeDetail"
      :formatDate="formatDate"
      :maskPhone="maskPhone" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import modalProfile from "@/components/modalProfile.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const profiles = ref([authStore.user]);
console.log(profiles.value);
const route = useRoute();
const userid = route.query.userid;

const showDetail = ref(false);
const detailProfile = ref({});

function openDetail(profile) {
  detailProfile.value = profile;
  showDetail.value = true;
}
function closeDetail() {
  showDetail.value = false;
}
function gotoEditProfile() {
  router.push({
    name: "updateUserInfo",
    // params: { id: detailProfile.value.id },
    query: { userid: profiles.value[0].id },
  });
  alert(profiles.value[0].id);
}
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
}
function maskPhone(phone) {
  if (!phone) return "";
  return phone.slice(0, 3) + "****" + phone.slice(-3);
}
</script>
