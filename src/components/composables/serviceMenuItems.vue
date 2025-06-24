<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Dịch vụ y tế
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          class="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center hover:transform hover:-translate-y-1">
          <div class="w-16 h-16 mx-auto mb-4">
            <img
              :src="item.img"
              :alt="item.title"
              class="w-full h-full object-contain" />
          </div>
          <h3
            class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-600 mt-2">
            {{ item.desc }}
          </p>
        </RouterLink>
      </div>
    </div>
    <hospitalsContact />
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import hospitalsContact from "./hospitalsContact.vue";

// Import images
import imgChuyenKhoa from "@/assets/logo/dat-kham-chuyen-khoa.webp";
import imgTaiCoSo from "@/assets/logo/dat-kham-tai-co-so.webp";
import imgTheoBS from "@/assets/logo/dat-kham-theo-bs.webp";
import imgGoiKham from "@/assets/logo/goi_kham.webp";

const menuItems = [
  {
    to: "/dich-vu-y-te/dat-kham-chuyen-khoa",
    img: imgChuyenKhoa,
    title: "Đặt khám chuyên khoa",
    desc: "Khám với bác sĩ chuyên khoa hàng đầu",
  },
  {
    to: "/dich-vu-y-te/dat-kham-tai-co-so",
    img: imgTaiCoSo,
    title: "Đặt khám tại cơ sở",
    desc: "Khám trực tiếp tại bệnh viện, phòng khám",
  },
  {
    to: "/dich-vu-y-te/dat-kham-theo-bs",
    img: imgTheoBS,
    title: "Đặt khám theo bác sĩ",
    desc: "Chọn bác sĩ phù hợp với nhu cầu",
  },
  {
    to: "/dich-vu-y-te/goi-kham",
    img: imgGoiKham,
    title: "Gói khám",
    desc: "Khám tổng quát với nhiều ưu đãi",
  },
];
</script>

<style scoped></style>
