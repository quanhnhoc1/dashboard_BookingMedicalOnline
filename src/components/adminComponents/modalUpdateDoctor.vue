<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
    <!-- Thông tin chung -->
    <div>
      <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin bác sĩ</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label class="block font-medium"
            >Họ và tên <span class="text-red-500">*</span></label
          >
          <input type="text" class="input-form" v-model="doctor.fullName" />
        </div>
        <div>
          <label class="block font-medium"
            >Số điện thoại <span class="text-red-500">*</span></label
          >
          <input type="text" class="input-form" v-model="doctor.phone" />
        </div>
        <div>
          <label class="block font-medium"
            >Email <span class="text-red-500">*</span></label
          >
          <input type="email" class="input-form" v-model="doctor.email" />
        </div>
        <div>
          <label class="block font-medium"
            >Bằng cấp <span class="text-red-500">*</span></label
          >
          <input type="text" class="input-form" v-model="doctor.degree" />
        </div>
        <div>
          <label class="block font-medium"
            >Chuyên khoa <span class="text-red-500">*</span></label
          >
          <select class="input-form" v-model="doctor.specialtyID">
            <option value="">Chọn chuyên khoa</option>
            <option
              v-for="specialty in specialties"
              :key="specialty.specialtyID"
              :value="specialty.specialtyID">
              {{ specialty.specialtyName }}
            </option>
          </select>
          <div
            v-if="specialties.length === 0"
            class="text-xs text-gray-500 mt-1">
            Đang tải danh sách chuyên khoa...
          </div>
        </div>
        <div>
          <label class="block font-medium"
            >Bệnh viện <span class="text-red-500">*</span></label
          >
          <select class="input-form" v-model="doctor.hospitalID">
            <option value="">Chọn bệnh viện</option>
            <option
              v-for="hospital in hospitals"
              :key="hospital.id"
              :value="hospital.id">
              {{ hospital.name }}
            </option>
          </select>
          <div v-if="hospitals.length === 0" class="text-xs text-gray-500 mt-1">
            Đang tải danh sách bệnh viện...
          </div>
        </div>
        <div>
          <label class="block font-medium">Kinh nghiệm (năm)</label>
          <input
            type="number"
            class="input-form"
            v-model="doctor.experience_years" />
        </div>
        <div>
          <label class="block font-medium"
            >Trạng thái <span class="text-red-500">*</span></label
          >
          <select class="input-form" v-model="doctor.status">
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="pending">Chờ duyệt</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Thông tin địa chỉ -->
    <div>
      <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin địa chỉ</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label class="block font-medium"
            >Tỉnh/Thành phố <span class="text-red-500">*</span></label
          >
          <select
            class="input-form"
            v-model="addressStore.selectedProvince"
            @change="addressStore.fetchDistricts()">
            <option value="">Chọn tỉnh/thành phố</option>
            <option
              v-for="province in addressStore.provinces"
              :key="province.Province"
              :value="province.Province">
              {{ province.Province }}
            </option>
          </select>
          <div
            v-if="addressStore.provinces.length === 0"
            class="text-xs text-gray-500 mt-1">
            Đang tải danh sách tỉnh/thành phố...
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
            :disabled="!addressStore.selectedProvince">
            <option value="">Chọn quận/huyện</option>
            <option
              v-for="district in addressStore.districts"
              :key="district.name"
              :value="district.name">
              {{ district.name }}
            </option>
          </select>
          <div
            v-if="
              addressStore.selectedProvince &&
              addressStore.districts.length === 0
            "
            class="text-xs text-gray-500 mt-1">
            Đang tải danh sách quận/huyện...
          </div>
        </div>
        <div>
          <label class="block font-medium"
            >Phường/Xã <span class="text-red-500">*</span></label
          >
          <select
            class="input-form"
            v-model="addressStore.selectedWard"
            :disabled="!addressStore.selectedDistrict">
            <option value="">Chọn phường/xã</option>
            <option
              v-for="ward in addressStore.wards"
              :key="ward.name"
              :value="ward.name">
              {{ ward.name }}
            </option>
          </select>
          <div
            v-if="
              addressStore.selectedDistrict && addressStore.wards.length === 0
            "
            class="text-xs text-gray-500 mt-1">
            Đang tải danh sách phường/xã...
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
            placeholder="Số nhà, tên đường, ấp thôn xóm..." />
          <span class="text-xs text-gray-500"
            >(không bao gồm tỉnh/thành, quận/huyện, phường/xã)</span
          >
        </div>
      </div>
    </div>

    <!-- Thông tin bổ sung -->
    <div>
      <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin bổ sung</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div class="md:col-span-2">
          <label class="block font-medium">Mô tả</label>
          <textarea
            class="input-form h-20 resize-none"
            v-model="doctor.description"
            placeholder="Mô tả về bác sĩ, chuyên môn, kinh nghiệm..."></textarea>
        </div>
        <div class="md:col-span-2">
          <label class="block font-medium">Ghi chú</label>
          <textarea
            class="input-form h-20 resize-none"
            v-model="doctor.notes"
            placeholder="Ghi chú nội bộ..."></textarea>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
      <button
        type="button"
        @click="$emit('close')"
        class="px-4 md:px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg transition-colors duration-200">
        Hủy
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 md:px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
        <div v-if="loading" class="flex items-center gap-2">
          <div
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Đang cập nhật...</span>
        </div>
        <span v-else>Cập nhật</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import { updateDoctorProfile } from "@/services/doctorServices";
import { useAddressStore } from "@/stores/getAddressStore";

const props = defineProps({
  user: Object,
  addressStore: Object,
});

const emit = defineEmits(["close", "updated"]);

const loading = ref(false);

const addressStore = useAddressStore();

const doctor = ref({});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      doctor.value = {
        doctorID: newUser.doctorID,
        fullName: newUser.doctorName || "",
        phone: newUser.phone || "",
        email: newUser.email || "",
        degree: newUser.degree || "",
        specialtyID: newUser.specialtyID || "",
        specialtyName: newUser.specialtyName || "",
        hospitalID: newUser.hospitalID || "",
        hospitalName: newUser.hospitalName || "",
        experience_years: newUser.experience_years || 0,
        status: newUser.status || "active",
        description: newUser.description || "",
        notes: newUser.notes || "",
      };

      // Tìm specialtyID và hospitalID từ tên
      if (newUser.specialtyName && props.addressStore?.allSpecialties) {
        const specialty = props.addressStore.allSpecialties.find(
          (s) => s.specialtyName === newUser.specialtyName
        );
        if (specialty) {
          doctor.value.specialtyID = specialty.specialtyID;
        }
      }

      if (newUser.hospitalName && props.addressStore?.allHospitals) {
        const hospital = props.addressStore.allHospitals.find(
          (h) => h.name === newUser.hospitalName
        );
        if (hospital) {
          doctor.value.hospitalID = hospital.id;
        }
      }

      // Xử lý địa chỉ nếu có
      if (newUser.ADDRESS || newUser.address) {
        const addressToProcess = newUser.ADDRESS || newUser.address;
        const addressParts = splitAddress(addressToProcess);
        addressStore.detailedAddress = addressParts.street;

        // Gán tỉnh/thành
        const matchedProvince = addressStore.provinces.find(
          (p) => normalize(p.Province) === normalize(addressParts.province)
        );
        if (matchedProvince) {
          addressStore.selectedProvince = matchedProvince.Province;
          // Load districts
          addressStore.fetchDistricts().then(() => {
            // Gán quận/huyện
            const matchedDistrict = addressStore.districts.find(
              (d) => normalize(d.name) === normalize(addressParts.district)
            );
            if (matchedDistrict) {
              addressStore.selectedDistrict = matchedDistrict.name;
              // Load wards
              addressStore.fetchWards().then(() => {
                // Gán phường/xã
                const matchedWard = addressStore.wards.find(
                  (w) => normalize(w.name) === normalize(addressParts.ward)
                );
                if (matchedWard) {
                  addressStore.selectedWard = matchedWard.name;
                }
              });
            }
          });
        }
      }
    }
  },
  { immediate: true, deep: true }
);

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

// Hàm chuẩn hóa chuỗi để so sánh
function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .trim()
    .toLowerCase();
}

onMounted(async () => {
  await addressStore.fetchProvinces();
});

// Computed properties để đảm bảo reactivity
const hospitals = computed(() => {
  const data = props.addressStore?.allHospitals || [];
  console.log("Modal - hospitals computed:", data);
  return data;
});
const specialties = computed(() => {
  const data = props.addressStore?.allSpecialties || [];
  return data;
});

// Watch for changes in specialtyID to update specialtyName
watch(
  () => doctor.value.specialtyID,
  (newSpecialtyID) => {
    if (newSpecialtyID && props.addressStore?.allSpecialties) {
      const specialty = props.addressStore.allSpecialties.find(
        (s) => s.specialtyID === newSpecialtyID
      );
      if (specialty) {
        doctor.value.specialtyName = specialty.specialtyName;
      }
    }
  }
);

// Watch for changes in hospitalID to update hospitalName
watch(
  () => doctor.value.hospitalID,
  (newHospitalID) => {
    if (newHospitalID && props.addressStore?.allHospitals) {
      const hospital = props.addressStore.allHospitals.find(
        (h) => h.id === newHospitalID
      );
      if (hospital) {
        doctor.value.hospitalName = hospital.name;
      }
    }
  }
);

// Cấu hình Toast notification
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

async function handleSubmit() {
  try {
    loading.value = true;

    // Validate required fields
    if (!doctor.value.fullName?.trim()) {
      throw new Error("Họ và tên bác sĩ là bắt buộc");
    }
    if (!doctor.value.phone?.trim()) {
      throw new Error("Số điện thoại là bắt buộc");
    }
    if (!doctor.value.email?.trim()) {
      throw new Error("Email là bắt buộc");
    }
    if (!doctor.value.degree?.trim()) {
      throw new Error("Bằng cấp là bắt buộc");
    }
    if (!doctor.value.specialtyID?.trim()) {
      throw new Error("Chuyên khoa là bắt buộc");
    }
    if (!doctor.value.hospitalID?.trim()) {
      throw new Error("Bệnh viện là bắt buộc");
    }

    // Validate address fields
    if (!addressStore.selectedProvince?.trim()) {
      throw new Error("Tỉnh/thành phố là bắt buộc");
    }
    if (!addressStore.selectedDistrict?.trim()) {
      throw new Error("Quận/huyện là bắt buộc");
    }
    if (!addressStore.selectedWard?.trim()) {
      throw new Error("Phường/xã là bắt buộc");
    }
    if (!addressStore.detailedAddress?.trim()) {
      throw new Error("Địa chỉ chi tiết là bắt buộc");
    }

    // Ghép địa chỉ đầy đủ
    const fullAddress = [
      addressStore.detailedAddress,
      addressStore.selectedWard,
      addressStore.selectedDistrict,
      addressStore.selectedProvince,
    ]
      .filter(Boolean)
      .join(", ");

    // Thêm địa chỉ vào doctor data
    const doctorDataWithAddress = {
      ...doctor.value,
      address: fullAddress,
    };

    // Hiển thị confirm dialog
    const result = await Swal.fire({
      title: "Xác nhận cập nhật",
      text: `Bạn có chắc chắn muốn cập nhật thông tin bác sĩ ${doctor.value.fullName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      // Debug: Log the data being sent
      console.log("Sending update data:", doctorDataWithAddress);

      // Gọi API cập nhật bác sĩ
      await updateDoctorProfile(doctor.value.doctorID, doctorDataWithAddress);

      // Hiển thị Toast thông báo thành công
      Toast.fire({
        icon: "success",
        title: `Đã cập nhật thông tin bác sĩ thành công!`,
      });

      // Emit event để parent component biết đã cập nhật
      emit("updated", doctorDataWithAddress);
    }
  } catch (error) {
    console.error("Error updating doctor:", error);

    // Hiển thị Toast thông báo lỗi
    Toast.fire({
      icon: "error",
      title: `Không thể cập nhật thông tin bác sĩ ${doctor.value.fullName}!`,
      text: error.message || "Vui lòng thử lại sau.",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-400;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .input-form {
    @apply text-sm;
  }
}

/* Modal specific responsive styles */
@media (max-width: 640px) {
  .input-form {
    @apply px-2 py-1.5;
  }
}
</style>
