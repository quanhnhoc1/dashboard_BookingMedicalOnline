<template>
  <div class="min-h-screen flex flex-col mx-auto bg-blue-50">
    <breadcrumb>
      <template #middle><span>Tạo hồ sơ bệnh nhân</span></template>
    </breadcrumb>
    <div class="flex flex-col items-center min-h-screen bg-blue-50 px-4">
      <div class="w-full max-w-6xl">
        <addNewUserProfileFrom />
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumb from "@/components/breadcrumb.vue";
import addNewUserProfileFrom from "@/components/addNewUserProfileFrom.vue";
</script>

<style lang="scss" scoped></style>
