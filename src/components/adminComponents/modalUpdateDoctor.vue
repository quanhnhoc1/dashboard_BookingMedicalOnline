<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Thông tin chung -->
    <div>
      <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin bác sĩ</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

    <!-- Thông tin bổ sung -->
    <div>
      <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin bổ sung</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium">Mô tả</label>
          <textarea
            class="input-form h-20 resize-none"
            v-model="doctor.description"
            placeholder="Mô tả về bác sĩ, chuyên môn, kinh nghiệm..."></textarea>
        </div>
        <div>
          <label class="block font-medium">Ghi chú</label>
          <textarea
            class="input-form h-20 resize-none"
            v-model="doctor.notes"
            placeholder="Ghi chú nội bộ..."></textarea>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t">
      <button
        type="button"
        @click="$emit('close')"
        class="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg transition-colors duration-200">
        Hủy
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
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
import { ref, watch, computed } from "vue";
import Swal from "sweetalert2";
import { updateDoctorProfile } from "@/services/doctorServices";

const props = defineProps({
  user: Object,
  addressStore: Object,
});

const emit = defineEmits(["close", "updated"]);

const loading = ref(false);

// Tạo reactive copy của doctor data
const doctor = ref({});

// Watch props.user để cập nhật doctor data
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      // Map dữ liệu từ user (doctor) sang doctor object
      doctor.value = {
        doctorID: newUser.doctorID,
        fullName: newUser.doctorName || "",
        phone: newUser.phone || "",
        email: newUser.email || "",
        degree: newUser.degree || "",
        specialtyID: newUser.specialtyID || "",
        specialtyName: newUser.specialtyName || "", // For display in dropdown
        hospitalID: newUser.hospitalID || "",
        hospitalName: newUser.hospitalName || "", // For display in dropdown
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

      console.log("Modal - doctor data mapped:", doctor.value);
    }
  },
  { immediate: true, deep: true }
);

// Debug để kiểm tra dữ liệu
console.log("Modal - addressStore:", props.addressStore);
console.log("Modal - allHospitals:", props.addressStore?.allHospitals);
console.log("Modal - allSpecialties:", props.addressStore?.allSpecialties);

// Computed properties để đảm bảo reactivity
const hospitals = computed(() => {
  const data = props.addressStore?.allHospitals || [];
  console.log("Modal - hospitals computed:", data);
  return data;
});
const specialties = computed(() => {
  const data = props.addressStore?.allSpecialties || [];
  console.log("Modal - specialties computed:", data);
  return data;
});

// Debug để kiểm tra khi modal mở
console.log("Modal opened - hospitals count:", hospitals.value.length);
console.log("Modal opened - specialties count:", specialties.value.length);

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
      console.log("Sending update data:", doctor.value);

      // Gọi API cập nhật bác sĩ
      await updateDoctorProfile(doctor.value.doctorID, doctor.value);

      // Hiển thị Toast thông báo thành công
      Toast.fire({
        icon: "success",
        title: `Đã cập nhật thông tin bác sĩ  thành công!`,
      });

      // Emit event để parent component biết đã cập nhật
      emit("updated", doctor.value);
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
</style>

<style>
/* Custom styles for toast notifications */
/* .swal2-toast {
  background: white !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  padding: 16px !important;
  min-width: 300px !important;
}

.swal2-toast-title {
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #374151 !important;
  margin-bottom: 4px !important;
}

.swal2-toast-content {
  font-size: 13px !important;
  color: #6b7280 !important;
  line-height: 1.4 !important;
}

/* Success toast specific styles */
/* .swal2-toast.swal2-icon-success {
  border-left: 4px solid #10b981 !important;
} */

/* Error toast specific styles */
/* .swal2-toast.swal2-icon-error {
  border-left: 4px solid #ef4444 !important;
} */
</style>
