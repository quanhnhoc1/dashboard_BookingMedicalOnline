<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center text-cyan-600">
      TẠO MỚI HỒ SƠ
    </h1>

    <!-- Form -->
    <div class="border rounded-lg p-8 bg-white shadow-lg">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Thông tin chung -->
        <div>
          <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin chung</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block font-medium"
                >Họ và tên <span class="text-red-500">*</span></label
              >
              <input type="text" class="input-form" v-model="user.FULL_NAME" />
            </div>
            <div class="flex gap-2">
              <div class="flex-1">
                <label class="block font-medium"
                  >Ngày sinh <span class="text-red-500">*</span></label
                >
                <div class="flex gap-2">
                  <select class="input-form" v-model="selectedYear">
                    <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                  <select class="input-form" v-model="selectedMonth">
                    <option v-for="month in months" :key="month" :value="month">
                      Tháng {{ month }}
                    </option>
                  </select>
                  <select class="input-form" v-model="selectedDay">
                    <option v-for="day in days" :key="day" :value="day">
                      {{ day }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label class="block font-medium"
                >Số điện thoại <span class="text-red-500">*</span></label
              >
              <input type="text" class="input-form" v-model="user.PHONE" />
            </div>
            <div>
              <label class="block font-medium"
                >Giới tính <span class="text-red-500">*</span></label
              >
              <select class="input-form" v-model="user.GENDER">
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
              </select>
            </div>
            <div>
              <label class="block font-medium"
                >Nghề nghiệp <span class="text-red-500">*</span></label
              >
              <input type="text" class="input-form" v-model="user.JOB" />
            </div>
            <div>
              <label class="block font-medium"
                >CCCD/Passport <span class="text-red-500">*</span></label
              >
              <input type="text" class="input-form" v-model="user.CCCD" />
            </div>
            <div>
              <label class="block font-medium">Email</label>
              <input type="email" class="input-form" v-model="user.EMAIL" />
            </div>
            <div>
              <label class="block font-medium">Dân tộc</label>
              <select class="input-form" v-model="user.ETHNIC">
                <option value="">-- Chọn dân tộc --</option>
                <option
                  v-for="ethnic in ethnicGroups"
                  :key="ethnic"
                  :value="ethnic">
                  {{ ethnic }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Thông tin địa chỉ -->
        <div>
          <h2 class="text-lg font-bold mb-2 border-b pb-1">
            Thông tin địa chỉ
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block font-medium"
                >Địa chỉ chi tiết <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                class="input-form"
                v-model="addressStore.detailedAddress"
                placeholder="Số nhà, tên đường, phường/xã..." />
            </div>
            <div>
              <label class="block font-medium"
                >Tỉnh/Thành phố <span class="text-red-500">*</span></label
              >
              <select
                class="input-form"
                v-model="addressStore.selectedProvince"
                @change="addressStore.fetchDistricts()">
                <option value="">-- Chọn tỉnh/thành phố --</option>
                <option
                  v-for="province in addressStore.provinces"
                  :key="province.Province"
                  :value="province.Province">
                  {{ province.Province }}
                </option>
              </select>
            </div>
            <div>
              <label class="block font-medium"
                >Quận/Huyện <span class="text-red-500">*</span></label
              >
              <select
                class="input-form"
                v-model="addressStore.selectedDistrict"
                @change="addressStore.fetchWards()"
                :disabled="!addressStore.selectedProvince">
                <option value="">-- Chọn quận/huyện --</option>
                <option
                  v-for="district in addressStore.districts"
                  :key="district.name"
                  :value="district.name">
                  {{ district.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block font-medium"
                >Phường/Xã <span class="text-red-500">*</span></label
              >
              <select
                class="input-form"
                v-model="addressStore.selectedWard"
                :disabled="!addressStore.selectedDistrict">
                <option value="">-- Chọn phường/xã --</option>
                <option
                  v-for="ward in addressStore.wards"
                  :key="ward.name"
                  :value="ward.name">
                  {{ ward.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded">
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { createNewProfile } from "@/services/userServices";
import {
  sampleSelectData,
  sampleUserData,
  sampleUsersList as importedSampleUsersList,
  generateRandomUser,
  generateRandomUsers,
} from "@/data/sampleUserData.js";
import { useAddressStore } from "@/stores/getAddressStore";

const router = useRouter();
const addressStore = useAddressStore();

// Reactive data cho demo
const user = reactive({
  FULL_NAME: "",
  PHONE: "",
  EMAIL: "",
  GENDER: "male",
  JOB: "",
  CCCD: "",
  ETHNIC: "Kinh",
});

const selectedUserIndex = ref("");
const sampleUsersList = ref(importedSampleUsersList);

// Validation state
const validationErrors = ref({});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const selectedYear = ref(currentYear);
const selectedMonth = ref(1);
const selectedDay = ref(1);

// Sử dụng dữ liệu từ sampleSelectData
const ethnicGroups = sampleSelectData.ETHNICS;

// Sử dụng dữ liệu địa chỉ từ addressStore
// Không cần định nghĩa provinces, districts, wards vì sẽ lấy từ store

watch(
  () => user.birthDate,
  (val) => {
    if (val) {
      const date = new Date(val);
      selectedYear.value = date.getFullYear();
      selectedMonth.value = date.getMonth() + 1;
      selectedDay.value = date.getDate();
    }
  },
  { immediate: true }
);

const daysInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value, 0).getDate();
});
const days = computed(() =>
  Array.from({ length: daysInMonth.value }, (_, i) => i + 1)
);

watch([selectedYear, selectedMonth], () => {
  if (selectedDay.value > daysInMonth.value) {
    selectedDay.value = 1;
  }
});

// Load dữ liệu tỉnh/thành phố khi component mount
onMounted(async () => {
  await addressStore.fetchProvinces();
});

function getBirthDate() {
  return `${selectedYear.value}-${String(selectedMonth.value).padStart(
    2,
    "0"
  )}-${String(selectedDay.value).padStart(2, "0")}`;
}

async function handleSubmit() {
  // Validation - Kiểm tra các trường bắt buộc
  const requiredFields = {
    "Họ và tên": user.FULL_NAME,
    "Ngày sinh": selectedYear.value && selectedMonth.value && selectedDay.value,
    "Số điện thoại": user.PHONE,
    "Giới tính": user.GENDER,
    "Nghề nghiệp": user.JOB,
    "CCCD/Passport": user.CCCD,
    "Địa chỉ chi tiết": addressStore.detailedAddress,
    "Tỉnh/Thành phố": addressStore.selectedProvince,
    "Quận/Huyện": addressStore.selectedDistrict,
    "Phường/Xã": addressStore.selectedWard,
  };

  // Reset validation errors
  validationErrors.value = {};

  // Kiểm tra từng trường
  for (const [fieldName, value] of Object.entries(requiredFields)) {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      validationErrors.value[fieldName] = true;
      Swal.fire({
        icon: "error",
        title: "Thông tin không đầy đủ!",
        text: `Vui lòng nhập ${fieldName}`,
        confirmButtonText: "Đóng",
      });
      return;
    }
  }

  // Kiểm tra định dạng số điện thoại
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(user.PHONE.replace(/\s/g, ""))) {
    Swal.fire({
      icon: "error",
      title: "Số điện thoại không hợp lệ!",
      text: "Vui lòng nhập số điện thoại 10-11 chữ số",
      confirmButtonText: "Đóng",
    });
    return;
  }

  // Kiểm tra định dạng CCCD
  const cccdRegex = /^[0-9]{12}$/;
  if (!cccdRegex.test(user.CCCD.replace(/\s/g, ""))) {
    Swal.fire({
      icon: "error",
      title: "CCCD không hợp lệ!",
      text: "Vui lòng nhập CCCD 12 chữ số",
      confirmButtonText: "Đóng",
    });
    return;
  }

  const fullAddress = [
    addressStore.detailedAddress,
    addressStore.selectedWard,
    addressStore.selectedDistrict,
    addressStore.selectedProvince,
  ]
    .filter(Boolean)
    .join(", ");

  const { FULL_NAME, PHONE, EMAIL, GENDER, CCCD, ETHNIC, JOB } = user;

  const data = {
    fullName: FULL_NAME,
    phone: PHONE,
    email: EMAIL,
    gender: GENDER,
    cccd: CCCD,
    ethnic: ETHNIC,
    birthDate: getBirthDate(),
    address: fullAddress,
    job: JOB,
  };

  try {
    const confirm = await Swal.fire({
      title: "Bạn có chắc chắn muốn thêm hồ sơ mới này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Thêm mới",
      cancelButtonText: "Hủy",
    });
    if (confirm.isConfirmed) {
      await createNewProfile(data);
      await Swal.fire({
        icon: "success",
        title: "Thêm hồ sơ thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      // router.push({ name: "HoSoBenhNhan" });
      router.back();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Thêm hồ sơ thất bại!",
      text: err.message,
    });
  }
}
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400;
}

.input-form.error {
  @apply border-red-500 focus:ring-red-400;
}

.error-message {
  @apply text-red-500 text-sm mt-1;
}
</style>
