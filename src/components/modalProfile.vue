<template>
  <div
    v-if="showDetail"
    class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        @click="closeDetail">
        &times;
      </button>
      <h3 class="text-cyan-600 font-bold text-lg mb-4">Chi tiết hồ sơ</h3>
      <div class="space-y-2">
        <div class="flex items-center">
          <i class="fas fa-user text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Họ và tên</span>
          <span class="text-cyan-600 font-bold">{{
            detailProfile.FULL_NAME
          }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-birthday-cake text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Ngày sinh</span>
          <span>{{ formatDate(detailProfile.BIRTH_DATE) }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-phone text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Số điện thoại</span>
          <span>{{ maskPhone(detailProfile.PHONE) }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-venus-mars text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Giới tính</span>
          <span>{{ detailProfile.GENDER === "male" ? "Nam" : "Nữ" }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-id-card text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">CMND</span>
          <span>{{ detailProfile.CCCD }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-envelope text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Email</span>
          <span>{{ detailProfile.EMAIL || "Chưa cập nhật" }} </span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-briefcase text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Nghề Nghiệp</span>
          <span>{{ detailProfile.JOB || "Chưa cập nhật" }}</span>
        </div>
        <!-- <div class="flex items-center">
          <i class="fas fa-globe text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Quốc gia</span>
          <span>{{ detailProfile.country }}</span>
        </div> -->
        <div class="flex items-center">
          <i class="fas fa-map-marker-alt text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Địa chỉ</span>
          <span class="flex-1">{{ detailProfile.ADDRESS }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-users text-cyan-500 mr-2"></i>
          <span class="font-semibold w-32">Dân tộc</span>
          <span>{{ detailProfile.ETHNIC }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showDetail: Boolean,
  detailProfile: Object,
  closeDetail: Function,
  formatDate: Function,
  maskPhone: Function,
});
</script>

<style lang="scss" scoped></style>
