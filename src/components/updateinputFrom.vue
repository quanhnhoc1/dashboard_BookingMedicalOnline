<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Thông tin chung -->
    <div>
      <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin chung</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

    <!-- Slot cho phần địa chỉ -->
    <slot></slot>

    <div class="flex justify-end">
      <!-- <button
        type="submit"
        class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded">
        Cập nhật
      </button> -->
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { updateProfile } from "@/services/userServices";
import { sampleSelectData } from "@/data/sampleUserData.js";

const props = defineProps({
  user: Object,
  addressStore: Object,
});

const ethnicGroups = sampleSelectData.ETHNICS;
console.log("Props user in updateinputFrom:", props.user);
console.log("User keys:", Object.keys(props.user || {}));

// Watch toàn bộ user object để đảm bảo reactive
watch(
  () => props.user,
  (newUser) => {
    console.log("User object changed in updateinputFrom:", newUser);
    if (newUser && newUser.BIRTH_DATE) {
      const date = new Date(newUser.BIRTH_DATE);
      console.log("Setting birth date from user object change:", date);
      selectedYear.value = date.getFullYear();
      selectedMonth.value = date.getMonth() + 1;
      selectedDay.value = date.getDate();
    }
  },
  { immediate: true, deep: true }
);

const router = useRouter();

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const selectedYear = ref(currentYear);
const selectedMonth = ref(1);
const selectedDay = ref(1);

watch(
  () => props.user.BIRTH_DATE,
  (val) => {
    console.log("BIRTH_DATE from backend in updateinputFrom:", val);
    if (val) {
      const date = new Date(val);
      console.log("Parsed date in updateinputFrom:", date);
      selectedYear.value = date.getFullYear();
      selectedMonth.value = date.getMonth() + 1;
      selectedDay.value = date.getDate();
      console.log("Set selected values in updateinputFrom:", {
        year: selectedYear.value,
        month: selectedMonth.value,
        day: selectedDay.value,
      });
    } else {
      console.log(
        "No BIRTH_DATE value in updateinputFrom, using default values"
      );
      // Giữ nguyên giá trị mặc định nếu không có dữ liệu
    }
  },
  { immediate: true, deep: true }
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

function getBirthDate() {
  return `${selectedYear.value}-${String(selectedMonth.value).padStart(
    2,
    "0"
  )}-${String(selectedDay.value).padStart(2, "0")}`;
}

async function handleSubmit() {
  const fullAddress = [
    props.addressStore.detailedAddress,
    props.addressStore.selectedWard,
    props.addressStore.selectedDistrict,
    props.addressStore.selectedProvince,
  ]
    .filter(Boolean)
    .join(", ");

  const { FULL_NAME, PHONE, EMAIL, GENDER, CCCD, ETHNIC, JOB, ID_PROFILE } =
    props.user;

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
    idProfile: ID_PROFILE,
  };

  try {
    const confirm = await Swal.fire({
      title: "Bạn có chắc chắn muốn cập nhật thông tin này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    });
    if (confirm.isConfirmed) {
      await updateProfile(data);
      await Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      // router.push({ name: "HoSoBenhNhan" });
      router.back();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Cập nhật thất bại!",
      text: err.message,
    });
  }
}
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400;
}
</style>
