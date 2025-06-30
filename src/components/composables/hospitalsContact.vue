<template>
  <section class="py-16 bg-gray-50">
    <h2 class="text-3xl font-bold text-center text-[#0d2533] mb-10">
      ĐƯỢC TIN TƯỞNG HỢP TÁC VÀ ĐỒNG HÀNH
    </h2>
    <div class="max-w-6xl mx-auto">
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="4"
        :space-between="30"
        :navigation="true"
        :loop="true"
        :breakpoints="{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }"
        class="!pb-8">
        <SwiperSlide v-for="hospital in hospitals" :key="hospital.name">
          <div class="flex flex-col items-center w-full">
            <img
              :src="hospital.logo"
              :alt="hospital.name"
              class="h-16 object-contain mb-2" />
            <div class="flex items-center gap-1 text-center">
              <span
                class="font-semibold text-[#0d2533] text-base leading-tight"
                >{{ hospital.name }}</span
              >
              <i class="fa-solid fa-circle-check text-sky-500 text-sm"></i>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// import logo hospitals
import daLieuCT from "../../../public/publicHospitals_img/daLieuCT.webp";
import nhiDongCT from "../../../public/publicHospitals_img/NhiDongCT.webp";
import rangHamMatCT from "../../../public/publicHospitals_img/matRangHamMatCT.webp";
import timMachCT from "../../../public/publicHospitals_img/timMachCT.webp";
import daKhoaCT from "../../../public/publicHospitals_img/dkTPCT.webp";
import taiMuiHongCT from "../../../public/publicHospitals_img/TaiMuiHongCT.webp";
import CDCCT from "../../../public/publicHospitals_img/CDCCT.webp";
const hospitals = [
  {
    name: "Bệnh viện Da Liễu Cần Thơ",
    logo: daLieuCT,
  },
  {
    name: "Bệnh viện Nhi Đồng Cần Thơ",
    logo: nhiDongCT,
  },
  {
    name: "Bệnh viện Tim Mach Cần Thơ",
    logo: timMachCT,
  },
  {
    name: "Bệnh viện Đa Khoa TP Cần Thơ",
    logo: daKhoaCT,
  },
  {
    name: "Bệnh Viện Mắt",
    logo: rangHamMatCT,
  },
  {
    name: "Trung Tâm Kiểm sóat Bệnh Tật Cần Thơ",
    logo: CDCCT,
  },
  {
    name: "Bệnh Viện Tai Mũi Họng",
    logo: taiMuiHongCT,
  },
];
</script>

<style>
/* Tùy chỉnh nút Swiper nếu muốn */
.swiper-button-next,
.swiper-button-prev {
  color: #2188c3;
  background: #fff;
  border-radius: 9999px;
  box-shadow: 0 2px 8px 0 #0001;
  width: 10px;
  height: 10px;
  top: 45%;
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 1.5rem;
}
</style>
