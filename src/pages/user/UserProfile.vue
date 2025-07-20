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
          profile.FULL_NAME
        }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-birthday-cake text-cyan-500 mr-2"></i>
        <span class="font-semibold">Ngày sinh:</span>
        <span class="ml-2">{{ formatDate(profile.BIRTH_DATE) }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-phone text-cyan-500 mr-2"></i>
        <span class="font-semibold">Số điện thoại:</span>
        <span class="ml-2">{{ maskPhone(profile.PHONE) }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-venus-mars text-cyan-500 mr-2"></i>
        <span class="font-semibold">Giới tính:</span>
        <span class="ml-2">{{ profile.GENDER === "male" ? "Nam" : "Nữ" }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-map-marker-alt text-cyan-500 mr-2"></i>
        <span class="font-semibold">Địa chỉ:</span>
        <span class="ml-2 flex-1">{{ profile.ADDRESS }}</span>
      </div>
      <div class="mb-1 flex items-center">
        <i class="fas fa-users text-cyan-500 mr-2"></i>
        <span class="font-semibold">Dân tộc:</span>
        <span class="ml-2">{{ profile.ethnic || "Kinh" }}</span>
      </div>
      <div class="flex gap-4 mt-2">
        <button
          class="flex items-center text-red-500 hover:underline"
          @click="confirmDeleteProfile(profile)">
          <i class="fas fa-trash-alt mr-1"></i> Xóa hồ sơ
        </button>
        <button
          class="flex items-center text-blue-500 hover:underline"
          @click="gotoEditProfile(profile)">
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
import { ref, onMounted } from "vue";
import modalProfile from "@/components/modalProfile.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore"; // Đổi sang userStore
import Swal from "sweetalert2";

const userStore = useUserStore();
const profiles = ref(); // Khởi tạo rỗng

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
function gotoEditProfile(profile) {
  router.push({
    name: "updateUserInfo",
    query: { profileID: profile.ID_PROFILE },
  });
  console.log(
    "Chuyển đến trang sửa hồ sơ với IDprfile va userid:",
    profile.ID_PROFILE,
    profile.USER_ID
  );
  // Gọi hàm sửa hồ sơ nếu cần
}
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
}
function maskPhone(phone) {
  if (!phone) return "";
  return phone.slice(0, 3) + "****" + phone.slice(-3);
}

function confirmDeleteProfile(profile) {
  Swal.fire({
    title: "Bạn có chắc muốn xóa hồ sơ này?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await userStore.deleteUserProfileByID(profile.ID_PROFILE);
        await userStore.getUserProfile(); // Cập nhật lại danh sách
        profiles.value = userStore.UserProfile;
        Swal.fire("Đã xóa!", "Hồ sơ đã được xóa.", "success");
      } catch (err) {
        Swal.fire("Lỗi", err || "Không thể xóa hồ sơ", "error");
      }
    }
  });
}

// Lấy danh sách hồ sơ khi component mount
onMounted(async () => {
  await userStore.getUserProfile();
  profiles.value = userStore.UserProfile; // Gán danh sách hồ sơ
});
</script>
