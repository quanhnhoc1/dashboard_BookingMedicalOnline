<template>
  <div class="relative">
    <!-- Trigger -->
    <div @click="handleOpenModal">
      <slot name="trigger"></slot>
    </div>

    <!-- Modal -->
    <div v-if="isOpen" class="absolute z-50 mr-[-2.4rem]">
      <!-- Overlay -->
      <div class="fixed inset-0" @click="isOpen = false"></div>

      <!-- Modal Content with transition -->
      <Transition name="fade-zoom">
        <div v-show="isOpen" class="relative bg-white rounded-lg shadow-xl">
          <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <!-- User Info -->
            <Transition name="fade-up" appear>
              <div v-if="isOpen" class="flex items-center gap-3 mb-2">
                <div class="text-sky-400 text-3xl">
                  <i class="fi fi-rr-user"></i>
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Xin chào,</div>
                  <div class="text-sky-500 font-bold text-lg">
                    {{ fullName }}
                  </div>
                </div>
              </div>
            </Transition>

            <hr class="my-2" />

            <!-- Menu Options -->
            <Transition name="fade-up" appear>
              <div v-if="isOpen" class="flex flex-col gap-3 mb-2">
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-sky-800 hover:bg-sky-100">
                  <i class="fi fi-rr-add-folder"></i>
                  <RouterLink to="/ho-so-benh-nhan" class="font-semibold"
                    >Hồ sơ bệnh nhân</RouterLink
                  >
                </div>
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-sky-800 hover:bg-sky-100">
                  <i class="fi fi-rr-notebook"></i>
                  <router-link class="font-semibold" to="/phieu-kham-benh"
                    >Phiếu khám bệnh</router-link
                  >
                </div>
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-sky-800 hover:bg-sky-100">
                  <i class="fi fi-rr-bell"></i>
                  <router-link class="font-semibold" to="/thong-bao"
                    >Thông báo</router-link
                  >
                </div>
              </div>
            </Transition>

            <hr class="my-2" />

            <!-- Logout -->
            <Transition name="fade-up" appear>
              <div
                v-if="isOpen"
                @click="handleLogout"
                class="flex items-center gap-2 text-red-500 font-semibold cursor-pointer hover:text-red-600 mb-2">
                <i class="fi fi-rr-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </div>
            </Transition>

            <!-- Updated Info -->
            <Transition name="fade-up" appear>
              <div v-if="isOpen" class="text-xs text-gray-400 mt-2">
                Cập nhật mới nhất: 20/05/2025
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
const isOpen = ref(false);

const handleOpenModal = () => {
  if (isLoggedIn.value) {
    isOpen.value = true;
  } else {
    window.location.href = "/login";
  }
};

const handleLogout = () => {
  authStore.logout();
  window.location.href = "/";
};

const fullName = computed(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.fullName : "";
});
</script>

<style scoped>
/* Fade and zoom effect for modal box */
.fade-zoom-enter-active {
  transition: all 2s ease;
}
.fade-zoom-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-zoom-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* Fade-up effect for internal content */
.fade-up-enter-active {
  transition: all 0.6s ease-in-out;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Optional: minimum width for modal */
.absolute {
  position: absolute;
  right: 0;
  min-width: 200px;
}
</style>
