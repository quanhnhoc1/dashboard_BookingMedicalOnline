<template>
  <header
    class="w-full fixed top-0 left-0 z-50 bg-white shadow-sm border-b transition-all duration-300">
    <div class="max-w-[1170px] m-auto flex items-center">
      <transition name="slide-fade">
        <div class="logo">
          <img src="../assets/img/logoMepro.png" alt="medpro" class="h-14" />
        </div>
      </transition>
      <div class="flex-1">
        <transition name="slide-fade">
          <div
            v-if="!isHidden"
            class="flex justify-between items-center px-4 py-2 text-sm">
            <!-- Mạng xã hội -->
            <div class="flex items-center space-x-2 text-blue-900">
              <a
                href="#"
                class="flex items-center space-x-1 hover:text-blue-600">
                <i class="fab fa-tiktok align-text-bottom"></i>
                <span>Tiktok</span>
              </a>
              <span>|</span>
              <a
                href="#"
                class="flex items-center space-x-1 hover:text-blue-600">
                <i class="fab fa-facebook align-text-bottom"></i>
                <span>Facebook</span>
              </a>
              <span>|</span>
              <a
                href="#"
                class="flex items-center space-x-1 hover:text-blue-600">
                <i class="fab fa-youtube align-text-bottom"></i>
                <span>Youtube</span>
              </a>
            </div>

            <!-- Tải app + User -->
            <div class="flex items-center space-x-4">
              <div class="relative">
                <i class="fas fa-bell text-xl text-pink-600"></i>
                <span
                  class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  99+
                </span>
              </div>
              <button
                class="bg-yellow-400 hover:bg-yellow-300 text-white px-4 py-1 rounded-full flex items-center space-x-2">
                <i class="fas fa-mobile-alt"></i>
                <span>Tải ứng dụng</span>
              </button>
              <!-- <button
                class="group border border-blue-500 text-blue-500 px-3 py-1 rounded-full flex items-center space-x-1 hover:bg-blue-500">
                <i class="group-hover:text-white fas fa-user"></i>
                <span class="group-hover:text-white">NM Thân</span>
              </button> -->
              <Modal>
                <template #trigger>
                  <button
                    class="group border border-blue-500 text-blue-500 px-3 py-1 rounded-full flex items-center space-x-1 hover:bg-blue-500">
                    <i class="group-hover:text-white fas fa-user"></i>
                    <span class="group-hover:text-white">NM Thân</span>
                  </button>
                </template>
              </Modal>
            </div>
          </div>
        </transition>

        <!-- Nav Bar -->
        <nav
          :class="[
            'bg-white px-4 flex items-center justify-between space-x-6 text-sm text-blue-900 font-medium transition-all duration-300',
            isHidden ? 'py-1' : 'py-2',
          ]">
          <div class="flex items-center space-x-2">
            <!-- <i class="fas fa-headset text-red-500 text-lg"></i> -->
            <slot name="iconHeadPhone"></slot>
            <div>
              <slot name="phoneNumberCall"></slot>
              <!-- <p class="text-xs">Hỗ trợ đặt khám</p>
              <p class="text-orange-500 font-semibold text-lg">1900 2115</p> -->
            </div>
          </div>

          <div class="flex items-center space-x-6 ml-10">
            <DropdownMenu
              title="Cơ sở y tế"
              link="/co-so-y-te"
              :items="[
                { label: 'Bệnh viện tư', href: '/co-so-y-te/benh-vien-tu' },
                { label: 'Bệnh viện công', href: '/co-so-y-te/benh-vien-cong' },
                { label: 'Phòng khám', href: 'phong-kham' },
              ]" />
            <span>Dịch vụ y tế</span>
            <span>Khám sức khỏe doanh nghiệp</span>
            <span class="relative group cursor-pointer">
              Tin tức <i class="fas fa-chevron-down text-xs ml-1"></i>
            </span>
            <span class="relative group cursor-pointer">
              Hướng dẫn <i class="fas fa-chevron-down text-xs ml-1"></i>
            </span>
            <span class="relative group cursor-pointer">
              Liên hệ hợp tác <i class="fas fa-chevron-down text-xs ml-1"></i>
            </span>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DropdownMenu from "@/components/MenuDropDown.vue";
import Modal from "../components/Modal.vue";
const isHidden = ref(false);
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentY = window.scrollY;

  if (currentY > lastScrollY && currentY > 100) {
    isHidden.value = true;
  } else if (currentY < lastScrollY) {
    isHidden.value = false;
  }

  lastScrollY = currentY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
