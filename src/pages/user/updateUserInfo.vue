<template>
  <div class="min-h-screen flex flex-col mx-auto bg-blue-50">
    <breadcrumb />
    <div class="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto mt-6">
      <div class="text-red-500 font-semibold mb-2">
        (*) Thông tin bắt buộc nhập
      </div>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Thông tin chung -->
        <div>
          <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin chung</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-medium"
                >Họ và tên (có dấu) <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                class="input-form"
                v-model="usernoToken.fullName" />
            </div>
            <div class="flex gap-2">
              <div class="flex-1">
                <label class="block font-medium"
                  >Ngày sinh (năm/tháng/ngày)
                  <span class="text-red-500">*</span></label
                >
                <div class="flex gap-2">
                  <select class="input-form" v-model="selectedYear">
                    <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                  <select class="input-form" v-model="selectedMonth">
                    <option v-for="month in months" :key="month" :value="month">
                      {{ `Tháng ${month}` }}
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
              <input
                type="text"
                class="input-form"
                v-model="usernoToken.phone" />
            </div>
            <div>
              <label class="block font-medium"
                >Giới tính <span class="text-red-500">*</span></label
              >
              <select class="input-form" v-model="user.gender">
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
                <!-- <option value="other">Khác</option> -->
              </select>
            </div>
            <div>
              <label class="block font-medium"
                >Nghề nghiệp <span class="text-red-500">*</span></label
              >
              <input type="text" class="input-form" placeholder="Điều dưỡng" />
            </div>
            <div>
              <label class="block font-medium"
                >Mã định danh/CCCD/Passport
                <span class="text-red-500">*</span></label
              >
              <input type="text" class="input-form" v-model="user.cccd" />
            </div>
            <div>
              <label class="block font-medium">Địa chỉ Email</label>
              <input type="email" class="input-form" v-model="user.email" />
            </div>
            <div>
              <label class="block font-medium">Dân tộc</label>
              <select class="input-form">
                <option>{{ usernoToken.ethnic }}</option>
                <option>Khác</option>
              </select>
            </div>
          </div>
        </div>
        <!-- Địa chỉ theo CCCD -->
        <div>
          <h2 class="text-lg font-bold mb-2 border-b pb-1">
            Địa chỉ theo CCCD
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-medium"
                >Tỉnh/Thành <span class="text-red-500">*</span></label
              >
              <select
                class="input-form"
                v-model="addressStore.selectedProvince"
                @change="addressStore.fetchDistricts()">
                <option value="" disabled>Chọn tỉnh/thành</option>
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
                <option value="" disabled>Chọn quận/huyện</option>
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
                :disabled="!addressStore.selectedDistrict"
                @change="logAddress">
                <option value="" disabled>Chọn phường/xã</option>
                <option
                  v-for="ward in addressStore.wards"
                  :key="ward"
                  :value="ward.name">
                  {{ ward.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block font-medium"
                >Số nhà/Tên đường/Ấp thôn xóm
                <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                class="input-form"
                v-model="addressStore.detailedAddress"
                placeholder="Nhà trọ Út Hồng, 171A/5 đường Vòng Cung, khu vực..." />
              <span class="text-xs text-red-400"
                >(không bao gồm tỉnh/thành, quận/huyện, phường/xã)</span
              >
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { updateProfile } from "@/services/userServices";
import { useAddressStore } from "@/stores/getAddressStore";
import { onMounted } from "vue";

const getProfile = useAuthStore();
const getProfile1 = useAuthStore();
const user = getProfile.user;
const usernoToken = getProfile1.getProfile;
import breadcrumb from "@/components/breadcrumb.vue";

const addressStore = useAddressStore();
onMounted(() => {
  addressStore.fetchProvinces();
  getProfile1.fetchUser();
});

// Năm từ 1900 đến hiện tại
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

// Tháng 1-12
const months = Array.from({ length: 12 }, (_, i) => i + 1);

// Chọn năm, tháng, ngày
const selectedYear = ref(currentYear);
const selectedMonth = ref(1);
const selectedDay = ref(1);

// Nếu user.birthDate có giá trị, parse ra năm, tháng, ngày
if (user && user.birthDate) {
  const date = new Date(user.birthDate);
  selectedYear.value = date.getFullYear();
  selectedMonth.value = date.getMonth() + 1; // getMonth() trả về 0-11
  selectedDay.value = date.getDate();
}

// Tính số ngày trong tháng
const daysInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value, 0).getDate();
});
const days = computed(() =>
  Array.from({ length: daysInMonth.value }, (_, i) => i + 1)
);

// Theo dõi thay đổi tháng/năm để reset ngày nếu ngày vượt quá số ngày trong tháng
watch([selectedYear, selectedMonth], () => {
  if (selectedDay.value > daysInMonth.value) {
    selectedDay.value = 1;
  }
});

// Khi submit form, ghép lại thành birthDate
function getBirthDate() {
  // Định dạng YYYY-MM-DD
  return `${selectedYear.value}-${String(selectedMonth.value).padStart(
    2,
    "0"
  )}-${String(selectedDay.value).padStart(2, "0")}`;
}

const fullAddress = computed(() => {
  return [
    addressStore.detailedAddress,
    addressStore.selectedWard,
    addressStore.selectedDistrict,
    addressStore.selectedProvince,
  ]
    .filter(Boolean)
    .join(",");
});

async function handleSubmit() {
  // Ghép ngày sinh
  const birthDate = getBirthDate();

  // Ghép địa chỉ đầy đủ
  const fullAddress = [
    addressStore.detailedAddress,
    addressStore.selectedWard,
    addressStore.selectedDistrict,
    addressStore.selectedProvince,
  ]
    .filter(Boolean)
    .join(", ");

  // Tạo object dữ liệu gửi lên backend
  const data = {
    fullName: user.fullName,
    phone: user.phone,
    email: user.email,
    gender: user.gender,
    cccd: user.cccd,
    ethnic: user.ethnic,
    birthDate,
    address: fullAddress,
    // Thêm các trường khác nếu cần
  };

  try {
    const res = await updateProfile(data);
    console.log("Cập nhật thành công!");
    console.log(data);
    // Có thể cập nhật lại store hoặc chuyển trang nếu muốn
  } catch (err) {
    console.log("Cập nhật thất bại: " + err);
  }
}

function logAddress() {
  console.log("Địa chỉ vừa chọn:", fullAddress.value);
}
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400;
}
</style>
