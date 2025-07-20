<template>
  <div class="min-h-screen flex flex-col mx-auto bg-blue-50">
    <breadcrumb>
      <template #middle>,<span>middle</span></template>
      <template #end>Chỉnh sửa hồ sơ</template>
    </breadcrumb>
    <h2 class="text-2xl font-bold mb-4 text-center text-blue-700">
      Cập nhật hồ sơ: {{ user.FULL_NAME || "..." }}
    </h2>
    <div class="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto mt-6">
      <div class="text-red-500 font-semibold mb-2">
        (*) Thông tin bắt buộc nhập
      </div>
      <updateinputFrom :user="user" :addressStore="addressStore">
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
                  :key="ward.name"
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
      </updateinputFrom>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { updateProfile } from "@/services/userServices";
import { useAddressStore } from "@/stores/getAddressStore";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import breadcrumb from "@/components/breadcrumb.vue";
import Swal from "sweetalert2";
import updateinputFrom from "@/components/updateinputFrom.vue";

const addressStore = useAddressStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

// Tạo reactive object để lưu trữ dữ liệu user
const user = ref({});

console.log("Initial user:", user.value);
console.log("User keys:", Object.keys(user.value || {}));

// Hàm tách địa chỉ
function splitAddress(address) {
  if (!address)
    return {
      street: "",
      ward: "",
      district: "",
      province: "",
    };
  const parts = address.split(",");
  const trimmed = parts.map((p) => p.trim());
  return {
    street: trimmed[0] || "",
    ward: trimmed[1] || "",
    district: trimmed[2] || "",
    province: trimmed[3] || "",
  };
}

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .trim()
    .toLowerCase();
}

onMounted(async () => {
  await addressStore.fetchProvinces();

  const profileID = route.query.profileID;
  if (profileID) {
    try {
      await userStore.getUserProfileDetailStore(profileID);
      console.log("UserProfileDetail from store:", userStore.UserProfileDetail);

      // Cập nhật dữ liệu user từ store
      if (userStore.UserProfileDetail && userStore.UserProfileDetail.data) {
        Object.assign(user.value, userStore.UserProfileDetail.data);
      } else if (userStore.UserProfileDetail) {
        Object.assign(user.value, userStore.UserProfileDetail);
      }

      console.log("Updated user data:", user.value);
      console.log("BIRTH_DATE in user.value:", user.value.BIRTH_DATE);
      console.log("Type of BIRTH_DATE:", typeof user.value.BIRTH_DATE);

      // Xử lý địa chỉ nếu có
      if (user.value.ADDRESS) {
        const addressParts = splitAddress(user.value.ADDRESS);
        addressStore.detailedAddress = addressParts.street;

        // Gán tỉnh/thành
        const matchedProvince = addressStore.provinces.find(
          (p) => normalize(p.Province) === normalize(addressParts.province)
        );
        addressStore.selectedProvince = matchedProvince
          ? matchedProvince.Province
          : addressParts.province;

        await addressStore.fetchDistricts();

        // Gán quận/huyện
        const matchedDistrict = addressStore.districts.find(
          (d) => normalize(d.name) === normalize(addressParts.district)
        );
        addressStore.selectedDistrict = matchedDistrict
          ? matchedDistrict.name
          : addressParts.district;

        await addressStore.fetchWards();

        // Gán phường/xã
        const matchedWard = addressStore.wards.find(
          (w) => normalize(w.name) === normalize(addressParts.ward)
        );
        addressStore.selectedWard = matchedWard
          ? matchedWard.name
          : addressParts.ward;
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể tải thông tin hồ sơ. Vui lòng thử lại.",
      });
    }
  } else {
    console.warn("No profileID found in URL query parameters");
  }
});

// Năm từ 1900 đến hiện tại
const currentYear = new Date().getFullYear();
// const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

// // Tháng 1-12
// const months = Array.from({ length: 12 }, (_, i) => i + 1);

// Chọn năm, tháng, ngày
const selectedYear = ref(currentYear);
const selectedMonth = ref(1);
const selectedDay = ref(1);

// Nếu user.BIRTH_DATE có giá trị, parse ra năm, tháng, ngày
watch(
  () => user.value.BIRTH_DATE,
  (val) => {
    console.log("BIRTH_DATE from backend in updateUserInfo:", val);
    if (val) {
      const date = new Date(val);
      console.log("Parsed date in updateUserInfo:", date);
      selectedYear.value = date.getFullYear();
      selectedMonth.value = date.getMonth() + 1;
      selectedDay.value = date.getDate();
      console.log("Set selected values in updateUserInfo:", {
        year: selectedYear.value,
        month: selectedMonth.value,
        day: selectedDay.value,
      });
    } else {
      console.log(
        "No BIRTH_DATE value in updateUserInfo, using default values"
      );
      // Giữ nguyên giá trị mặc định nếu không có dữ liệu
    }
  },
  { immediate: true }
);

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
  return `${selectedYear.value}-${String(selectedMonth.value).padStart(
    2,
    "0"
  )}-${String(selectedDay.value).padStart(2, "0")}`;
}

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

  const { FULL_NAME, PHONE, EMAIL, GENDER, CCCD, ETHNIC, JOB, ID_PROFILE } =
    user.value;

  const data = {
    fullName: FULL_NAME,
    phone: PHONE,
    email: EMAIL,
    gender: GENDER,
    cccd: CCCD,
    ethnic: ETHNIC,
    birthDate,
    address: fullAddress,
    job: JOB,
    idProfile: ID_PROFILE,
  };
  try {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn cập nhật thông tin này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#e53e3e",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed) {
      await updateProfile(data);
      await Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push({ name: "HoSoBenhNhan" });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Cập nhật thất bại!",
      text: err?.message || err,
    });
  }
}

function logAddress() {
  console.log(
    "Địa chỉ vừa chọn:",
    [
      addressStore.detailedAddress,
      addressStore.selectedWard,
      addressStore.selectedDistrict,
      addressStore.selectedProvince,
    ]
      .filter(Boolean)
      .join(", ")
  );
}
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400;
}
</style>
