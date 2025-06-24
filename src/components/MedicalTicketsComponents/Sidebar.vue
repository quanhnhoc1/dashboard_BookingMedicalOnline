<template>
  <aside class="w-64 bg-white shadow h-screen p-4">
    <button
      class="flex items-center w-full p-3 bg-cyan-500 text-white rounded mb-4">
      <i class="fa-solid fa-user-plus"> </i>
      <span> Them ho so </span>
    </button>

    <ul class="space-y-2 text-gray-700">
      <RouterLink
        to="/ho-so-benh-nhan"
        class="flex items-center space-x-2 cursor-pointer"
        active-class="text-cyan-500 font-semibold border-l-4 border-cyan-500 pl-2">
        <i class="fas fa-id-badge"></i>
        <span>Hồ sơ bệnh nhân</span>
      </RouterLink>
      <RouterLink
        to="/phieu-kham-benh"
        class="flex items-center space-x-2 cursor-pointer"
        active-class="text-cyan-500 font-semibold border-l-4 border-cyan-500 pl-2">
        <i class="fas fa-file-medical"></i>
        <span>Phiếu khám bệnh</span>
      </RouterLink>
      <RouterLink
        to="/thong-bao"
        class="flex items-center space-x-2 cursor-pointer"
        active-class="text-cyan-500 font-semibold border-l-4 border-cyan-500 pl-2">
        <i class="fas fa-bell"></i>
        <span>Thông báo</span>
        <span class="ml-auto bg-red-500 text-white text-xs rounded-full px-2"
          >99+</span
        >
      </RouterLink>
    </ul>
  </aside>
</template>

<script setup></script>

<style scoped>
.material-icons {
  font-size: 20px;
}
</style>
