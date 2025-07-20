<template>
  <!-- Breadcrumb -->
  <div class="min-w-[1170px] mx-auto justify-center">
    <nav class="text-sm text-gray-600 mb-4">
      <span class="text-bold text-gray-900 font-bold">Trang chủ</span> &gt;
      <span class="text-[#00b5f1] text-m"> <slot name="middle"></slot></span>
      &gt;
      <span class="text-cyan-600 font-semibold"> <slot name="end"></slot></span>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
