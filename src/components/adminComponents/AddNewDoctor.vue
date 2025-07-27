<template>
  <div class="h-full w-full p-4 md:p-6 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
      <h1
        class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-cyan-600">
        THÊM BÁC SĨ MỚI
      </h1>

      <!-- Form -->
      <div class="border rounded-lg p-4 md:p-8 bg-white shadow-lg">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Thông tin chung -->
          <div>
            <h2 class="text-lg font-bold mb-2 border-b pb-1">
              Thông tin bác sĩ
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block font-medium"
                  >Họ và tên <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  class="input-form"
                  v-model="doctor.fullName"
                  :class="{ error: validationErrors.fullName }" />
                <div v-if="validationErrors.fullName" class="error-message">
                  Vui lòng nhập họ và tên
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Số điện thoại <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  class="input-form"
                  v-model="doctor.phone"
                  :class="{ error: validationErrors.phone }" />
                <div v-if="validationErrors.phone" class="error-message">
                  Vui lòng nhập số điện thoại hợp lệ
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  type="email"
                  class="input-form"
                  v-model="doctor.email"
                  :class="{ error: validationErrors.email }" />
                <div v-if="validationErrors.email" class="error-message">
                  Vui lòng nhập email hợp lệ
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Bằng cấp <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  class="input-form"
                  v-model="doctor.degree"
                  :class="{ error: validationErrors.degree }" />
                <div v-if="validationErrors.degree" class="error-message">
                  Vui lòng nhập bằng cấp
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Chuyên khoa <span class="text-red-500">*</span></label
                >
                <select
                  class="input-form"
                  v-model="doctor.specialtyID"
                  :class="{ error: validationErrors.specialtyID }">
                  <option value="">Chọn chuyên khoa</option>
                  <option
                    v-for="specialty in specialtiesList"
                    :key="specialty.specialtyID"
                    :value="specialty.specialtyID">
                    {{ specialty.specialtyName }}
                  </option>
                </select>
                <div v-if="validationErrors.specialtyID" class="error-message">
                  Vui lòng chọn chuyên khoa
                </div>
                <div
                  v-if="specialtiesList.length === 0"
                  class="text-xs text-gray-500 mt-1">
                  Đang tải danh sách chuyên khoa...
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Bệnh viện <span class="text-red-500">*</span></label
                >
                <select
                  class="input-form"
                  v-model="doctor.hospitalID"
                  :class="{ error: validationErrors.hospitalID }">
                  <option value="">Chọn bệnh viện</option>
                  <option
                    v-for="hospital in hospitalsList"
                    :key="hospital.id"
                    :value="hospital.id">
                    {{ hospital.name }}
                  </option>
                </select>
                <div v-if="validationErrors.hospitalID" class="error-message">
                  Vui lòng chọn bệnh viện
                </div>
                <div
                  v-if="hospitalsList.length === 0"
                  class="text-xs text-gray-500 mt-1">
                  Đang tải danh sách bệnh viện...
                </div>
              </div>
              <div>
                <label class="block font-medium">Kinh nghiệm (năm)</label>
                <input
                  type="number"
                  class="input-form"
                  v-model="doctor.experience_years"
                  min="0"
                  max="50" />
              </div>
              <div>
                <label class="block font-medium"
                  >Trạng thái <span class="text-red-500">*</span></label
                >
                <select
                  class="input-form"
                  v-model="doctor.status"
                  :class="{ error: validationErrors.status }">
                  <option value="">Chọn trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="pending">Chờ duyệt</option>
                </select>
                <div v-if="validationErrors.status" class="error-message">
                  Vui lòng chọn trạng thái
                </div>
              </div>
            </div>
          </div>

          <!-- Thông tin địa chỉ -->
          <div>
            <h2 class="text-lg font-bold mb-2 border-b pb-1">
              Thông tin địa chỉ
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block font-medium"
                  >Tỉnh/Thành phố <span class="text-red-500">*</span></label
                >
                <select
                  class="input-form"
                  v-model="addressStore.selectedProvince"
                  @change="addressStore.fetchDistricts()"
                  :class="{ error: validationErrors.province }">
                  <option value="">Chọn tỉnh/thành phố</option>
                  <option
                    v-for="province in addressStore.provinces"
                    :key="province.code"
                    :value="province.Province">
                    {{ province.Province }}
                  </option>
                </select>
                <div v-if="validationErrors.province" class="error-message">
                  Vui lòng chọn tỉnh/thành phố
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Quận/Huyện <span class="text-red-500">*</span></label
                >
                <select
                  class="input-form"
                  v-model="addressStore.selectedDistrict"
                  @change="addressStore.fetchWards()"
                  :class="{ error: validationErrors.district }">
                  <option value="">Chọn quận/huyện</option>
                  <option
                    v-for="district in addressStore.districts"
                    :key="district.code"
                    :value="district.name">
                    {{ district.name }}
                  </option>
                </select>
                <div v-if="validationErrors.district" class="error-message">
                  Vui lòng chọn quận/huyện
                </div>
              </div>
              <div>
                <label class="block font-medium"
                  >Phường/Xã <span class="text-red-500">*</span></label
                >
                <select
                  class="input-form"
                  v-model="addressStore.selectedWard"
                  :class="{ error: validationErrors.ward }">
                  <option value="">Chọn phường/xã</option>
                  <option
                    v-for="ward in addressStore.wards"
                    :key="ward.code"
                    :value="ward.name">
                    {{ ward.name }}
                  </option>
                </select>
                <div v-if="validationErrors.ward" class="error-message">
                  Vui lòng chọn phường/xã
                </div>
              </div>
              <div class="md:col-span-2">
                <label class="block font-medium"
                  >Địa chỉ chi tiết <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  class="input-form"
                  v-model="addressStore.detailedAddress"
                  placeholder="Số nhà, tên đường..."
                  :class="{ error: validationErrors.detailedAddress }" />
                <div
                  v-if="validationErrors.detailedAddress"
                  class="error-message">
                  Vui lòng nhập địa chỉ chi tiết
                </div>
              </div>
            </div>
          </div>

          <!-- Thông tin mô tả -->
          <div>
            <h2 class="text-lg font-bold mb-2 border-b pb-1">
              Thông tin bổ sung
            </h2>
            <div class="grid grid-cols-1 gap-4 md:gap-6">
              <div>
                <label class="block font-medium">Mô tả</label>
                <textarea
                  class="input-form"
                  v-model="doctor.description"
                  rows="4"
                  placeholder="Mô tả về bác sĩ, chuyên môn, kinh nghiệm..."></textarea>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div
            class="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t">
            <button
              type="button"
              @click="handleCancel"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Hủy
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span v-if="loading">Đang thêm...</span>
              <span v-else>Thêm bác sĩ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useDoctorStore } from "../../stores/getDoctorStore";
import { useAddressStore } from "../../stores/getAddressStore";
import { userHospitalsStore } from "../../stores/getHospitalsStore";
import Swal from "sweetalert2";

const router = useRouter();
const doctorStore = useDoctorStore();
const addressStore = useAddressStore();
const hospitalsStore = userHospitalsStore();

// Reactive data
const loading = ref(false);
const validationErrors = ref({});

// Sử dụng data từ getHospitalsStore
const specialties = ref([]);
const hospitals = ref([]);

// Computed properties để đảm bảo reactive
const specialtiesList = computed(() => {
  return hospitalsStore.allSpecialties.length > 0
    ? hospitalsStore.allSpecialties
    : specialties.value;
});

const hospitalsList = computed(() => {
  return hospitalsStore.allHospitals.length > 0
    ? hospitalsStore.allHospitals
    : hospitals.value;
});

const doctor = reactive({
  fullName: "",
  phone: "",
  email: "",
  degree: "",
  specialtyID: "",
  hospitalID: "",
  experience_years: "",
  status: "",
  description: "",
});

// Load dữ liệu khi component mount
onMounted(async () => {
  try {
    console.log("Loading data for AddNewDoctor component...");

    await Promise.all([
      addressStore.fetchProvinces(),
      hospitalsStore.getAllHospitals(),
      hospitalsStore.getAllSpecialties(),
    ]);

    console.log("Loaded hospitals:", hospitalsStore.allHospitals);
    console.log("Loaded specialties:", hospitalsStore.allSpecialties);
    console.log("Hospitals count:", hospitalsStore.allHospitals?.length || 0);
    console.log(
      "Specialties count:",
      hospitalsStore.allSpecialties?.length || 0
    );
  } catch (error) {
    console.error("Error loading data:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi tải dữ liệu!",
      text: "Không thể tải danh sách bệnh viện hoặc chuyên khoa",
      confirmButtonText: "Đóng",
    });
  }
});

function validateForm() {
  validationErrors.value = {};
  let isValid = true;

  // Kiểm tra các trường bắt buộc
  if (!doctor.fullName?.trim()) {
    validationErrors.value.fullName = true;
    isValid = false;
  }

  if (!doctor.phone?.trim()) {
    validationErrors.value.phone = true;
    isValid = false;
  } else {
    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(doctor.phone.replace(/\s/g, ""))) {
      validationErrors.value.phone = true;
      isValid = false;
    }
  }

  if (!doctor.email?.trim()) {
    validationErrors.value.email = true;
    isValid = false;
  } else {
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(doctor.email)) {
      validationErrors.value.email = true;
      isValid = false;
    }
  }

  if (!doctor.degree?.trim()) {
    validationErrors.value.degree = true;
    isValid = false;
  }

  if (!doctor.specialtyID) {
    validationErrors.value.specialtyID = true;
    isValid = false;
  }

  if (!doctor.hospitalID) {
    validationErrors.value.hospitalID = true;
    isValid = false;
  }

  if (!doctor.status) {
    validationErrors.value.status = true;
    isValid = false;
  }

  if (!addressStore.selectedProvince) {
    validationErrors.value.province = true;
    isValid = false;
  }

  if (!addressStore.selectedDistrict) {
    validationErrors.value.district = true;
    isValid = false;
  }

  if (!addressStore.selectedWard) {
    validationErrors.value.ward = true;
    isValid = false;
  }

  if (!addressStore.detailedAddress?.trim()) {
    validationErrors.value.detailedAddress = true;
    isValid = false;
  }

  return isValid;
}

async function handleSubmit() {
  if (!validateForm()) {
    Swal.fire({
      icon: "error",
      title: "Thông tin không đầy đủ!",
      text: "Vui lòng kiểm tra lại các trường bắt buộc",
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

  const doctorData = {
    fullName: doctor.fullName,
    phone: doctor.phone,
    email: doctor.email,
    degree: doctor.degree,
    specialtyID: doctor.specialtyID,
    hospitalID: doctor.hospitalID,
    experience_years: doctor.experience_years
      ? parseInt(doctor.experience_years)
      : 0,
    status: doctor.status,
    address: fullAddress,
    description: doctor.description || "",
  };

  try {
    loading.value = true;

    const confirm = await Swal.fire({
      title: "Bạn có chắc chắn muốn thêm bác sĩ mới này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Thêm mới",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      await doctorStore.addNewDoctor(doctorData);

      await Swal.fire({
        icon: "success",
        title: "Thêm bác sĩ thành công!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      Object.keys(doctor).forEach((key) => {
        doctor[key] = "";
      });
      addressStore.resetAddress();

      // Chuyển về trang danh sách bác sĩ
      router.push({ name: "DoctorProfiles" });
    }
  } catch (err) {
    console.error("Error adding doctor:", err);
    Swal.fire({
      icon: "error",
      title: "Thêm bác sĩ thất bại!",
      text: err.message || "Có lỗi xảy ra khi thêm bác sĩ",
      confirmButtonText: "Đóng",
    });
  } finally {
    loading.value = false;
  }
}

function handleCancel() {
  router.back();
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .input-form {
    @apply text-sm;
  }
}
</style>
