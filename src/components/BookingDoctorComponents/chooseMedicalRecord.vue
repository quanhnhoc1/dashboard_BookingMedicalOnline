<template>
  <div class="min-h-screen flex flex-col mx-auto bg-blue-50">
    <BreadCum />
    <div class="flex flex-col items-center min-h-screen bg-blue-50 py-8">
      <h1 class="text-4xl font-bold text-cyan-500 mb-8">
        Chọn hồ sơ bệnh nhân
      </h1>

      <!-- Danh sách tất cả hồ sơ -->
      <div class="w-full max-w-4xl space-y-4">
        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p class="mt-4 text-gray-600">Đang tải hồ sơ...</p>
        </div>

        <div v-else-if="userProfiles.length === 0" class="text-center py-8">
          <i class="fa-solid fa-user-slash text-6xl text-gray-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">
            Chưa có hồ sơ nào
          </h3>
          <p class="text-gray-500 mb-6">
            Hãy tạo hồ sơ đầu tiên để bắt đầu đặt lịch khám
          </p>
          <button
            @click="gotoAddnewUserprofileFrom"
            class="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors">
            <i class="fa-solid fa-user-plus mr-2"></i>
            Tạo hồ sơ đầu tiên
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-700">
              Danh sách hồ sơ ({{ userProfiles.length }})
            </h2>
            <button
              @click="gotoAddnewUserprofileFrom"
              class="flex items-center bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
              <i class="fa-solid fa-user-plus mr-2"></i>
              Thêm hồ sơ mới
            </button>
          </div>

          <div
            v-for="(profile, index) in userProfiles"
            :key="profile.ID_PROFILE || index"
            class="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            @click="selectProfile(profile)">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-3">
                  <i class="fa-solid fa-user text-cyan-400 mr-3 text-xl"></i>
                  <span class="font-bold text-cyan-500 text-lg">{{
                    profile.FULL_NAME
                  }}</span>
                  <span
                    v-if="profile.ID_PROFILE"
                    class="ml-2 text-sm text-gray-500"
                    >#{{ profile.ID_PROFILE }}</span
                  >
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div class="flex items-center">
                    <i
                      class="fa-solid fa-cake-candles text-cyan-500 mr-2 w-4"></i>
                    <span class="font-semibold">Ngày sinh:</span>
                    <span class="ml-2">{{
                      formatDate(profile.BIRTH_DATE)
                    }}</span>
                  </div>

                  <div class="flex items-center">
                    <i class="fa-solid fa-phone text-cyan-400 mr-2 w-4"></i>
                    <span class="font-semibold">Số điện thoại:</span>
                    <span class="ml-2">{{
                      profile.PHONE || "Chưa cập nhật"
                    }}</span>
                  </div>

                  <div class="flex items-center">
                    <i
                      class="fa-solid fa-venus-mars text-cyan-400 mr-2 w-4"></i>
                    <span class="font-semibold">Giới tính:</span>
                    <span class="ml-2">{{
                      profile.GENDER === "male"
                        ? "Nam"
                        : profile.GENDER === "female"
                        ? "Nữ"
                        : "Chưa cập nhật"
                    }}</span>
                  </div>

                  <div class="flex items-center">
                    <i class="fa-solid fa-briefcase text-cyan-400 mr-2 w-4"></i>
                    <span class="font-semibold">Nghề nghiệp:</span>
                    <span class="ml-2">{{
                      profile.JOB || "Chưa cập nhật"
                    }}</span>
                  </div>
                </div>

                <div class="mt-3">
                  <div class="flex items-start">
                    <i
                      class="fa-solid fa-location-dot text-cyan-400 mr-2 mt-1 w-4"></i>
                    <span class="font-semibold">Địa chỉ:</span>
                    <p class="ml-2 flex-1">
                      {{ profile.ADDRESS || "Chưa cập nhật" }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex flex-col space-y-2 ml-4">
                <button
                  @click.stop="handleEdit(profile)"
                  class="bg-blue-100 text-blue-500 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                  <i class="fa-solid fa-edit mr-1"></i>
                  Sửa
                </button>
                <button
                  @click.stop="handleDelete(profile)"
                  class="bg-pink-100 text-pink-500 px-3 py-1 rounded-lg text-sm hover:bg-pink-200 transition-colors">
                  <i class="fa-solid fa-trash mr-1"></i>
                  Xóa
                </button>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100">
              <button
                @click.stop="selectProfile(profile)"
                class="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                <i class="fa-solid fa-check mr-2"></i>
                Chọn hồ sơ này
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Nút quay lại -->
      <div class="mt-8">
        <button
          @click="goBack"
          class="flex items-center text-gray-600 hover:text-cyan-500 p-2 rounded-full hover:bg-cyan-50 transition-colors">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          <span>Quay lại</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import BreadCum from "@/components/breadcrumb.vue";
import { useUserStore } from "@/stores/userStore";
import { useRouteStore } from "@/stores/routeStore";
import { useRouter } from "vue-router";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { useDoctorStore } from "@/stores/getDoctorStore";
const hospitalsStore = userHospitalsStore();
const doctorStore = useDoctorStore();
const router = useRouter();
const routeStore = useRouteStore();
const userStore = useUserStore();

const userProfiles = ref([]);
const loading = ref(false);
const selectedProfile = ref(null);

const fetchAllProfiles = async () => {
  loading.value = true;
  try {
    const profiles = await userStore.getUserProfile();
    userProfiles.value = profiles || [];
    console.log("Fetched profiles:", userProfiles.value);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Không thể tải danh sách hồ sơ. Vui lòng thử lại.",
    });
  } finally {
    loading.value = false;
  }
};

function selectProfile(profile) {
  const hospitalId = hospitalsStore.selectedHospital?.ID;
  const doctorId =
    hospitalsStore.selectedDoctor?.DOCTOR_PRO_ID ||
    hospitalsStore.selectedDoctor?.ID;

  // Lấy ngày đã chọn và schedule ID từ store
  const selectedDate = doctorStore.selectedDate;
  const scheduleID = doctorStore.scheduleID[selectedDate];

  // Log ra ID lịch khám đã chọn
  console.log("Schedule ID đã chọn:", scheduleID);
  console.log("", "Selected hospital ID:", hospitalId);
  selectedProfile.value = profile;
  router.push({
    name: "ConfirmBookingInfo",
    query: {
      profileID: profile.ID_PROFILE,
      HospitalID: profile.HOSPITAL_ID,
      scheduleID: scheduleID,
    },
  });
  console.log("Selected profile ID:", profile.ID_PROFILE);
  // console.log("Selected profile:", profile);
  Swal.fire({
    icon: "success",
    title: "Đã chọn hồ sơ",
    text: `Hồ sơ "${profile.FULL_NAME}" đã được chọn`,
    confirmButtonText: "Tiếp tục",
  }).then(() => {
    // Lưu hồ sơ đã chọn vào store hoặc localStorage
    localStorage.setItem("selectedProfile", JSON.stringify(profile));
    // Chuyển đến trang tiếp theo
    router.push({
      name: "ConfirmBookingInfo",
      query: {
        profileID: profile.ID_PROFILE,
        HospitalID: profile.HOSPITAL_ID,
        scheduleID: scheduleID,
      },
    });
  });
}

// Xóa hồ sơ
const handleDelete = async (profile) => {
  const result = await Swal.fire({
    title: "Xác nhận xóa",
    text: `Bạn có chắc chắn muốn xóa hồ sơ "${profile.FULL_NAME}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e53e3e",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await userStore.deleteUserProfileByID(profile.ID_PROFILE);
      Swal.fire("Thành công!", "Hồ sơ đã được xóa.", "success");
      // Tải lại danh sách hồ sơ
      await fetchAllProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể xóa hồ sơ. Vui lòng thử lại.",
      });
    }
  }
};

// Sửa hồ sơ
const handleEdit = (profile) => {
  console.log("Editing profile:", profile);
  console.log("Profile ID:", profile.ID_PROFILE);

  // Chuyển đến trang sửa hồ sơ với profile ID trên URL
  router.push({
    name: "updateUserInfo",
    query: { profileID: profile.ID_PROFILE },
  });
};

const gotoAddnewUserprofileFrom = () => {
  routeStore.gotoAddnewUserprofileFrom(router);
};

const goBack = () => {
  router.go(-1);
};

const formatDate = (date) => {
  if (!date) return "Chưa cập nhật";
  return new Date(date).toLocaleDateString("vi-VN");
};

// Tải dữ liệu khi component được mount
onMounted(() => {
  fetchAllProfiles();
});
</script>

<style lang="scss" scoped></style>
