<template>
  <div class="flex flex-col min-h-[2000px] max-w-[1170px] m-auto">
    <div class="flex justify-between items-center p-4 bg-white shadow-sm">
      <div class="w-[100px]">
        <img src="../assets/img/logoMepro.png" alt="Logo" />
      </div>
      <div class="search-bar">
        <SearchBar />
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <Modal>
            <template #trigger>
              <i class="fi fi-rr-bell cursor-pointer text-3xl"></i>
            </template>
            <template #content>
              <div class="px-4 py-3">
                <div class="flex items-start">
                  <div class="ml-3">
                    <h3 class="text-base font-semibold text-gray-900">
                      Danh sách thông báo
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">Đây là thông báo</p>
                  </div>
                </div>
              </div>
            </template>
          </Modal>
        </div>

        <Modal>
          <template #trigger>
            <div
              class="group flex items-center gap-2.5 p-4 font-bold rounded-4xl cursor-pointer hover:bg-sky-700 transition duration-300 border border-sky-300 rounded-xl">
              <i
                class="fi fi-rr-user text-sky-500 group-hover:text-white text-xl"></i>
              <h3 class="text-sky-500 group-hover:text-white">{{ user }}</h3>
            </div>
          </template>
          <template #content>
            <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <div class="flex items-center gap-3 mb-2">
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
              <hr class="my-2" />
              <div class="flex flex-col gap-3 mb-2">
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-sky-600">
                  <i class="fi fi-rr-add-folder"></i>
                  <span class="font-semibold">Hồ sơ bệnh nhân</span>
                </div>
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-sky-600">
                  <i class="fi fi-rr-notebook"></i>
                  <span class="font-semibold">Phiếu khám bệnh</span>
                </div>
                <div
                  class="flex items-center gap-2 cursor-pointer hover:text-sky-600">
                  <i class="fi fi-rr-bell"></i>
                  <span class="font-semibold">Thông báo</span>
                </div>
              </div>
              <hr class="my-2" />
              <div
                class="flex items-center gap-2 text-red-500 font-semibold cursor-pointer hover:text-red-600 mb-2">
                <i class="fi fi-rr-sign-out-alt"></i>
                <router-link to="/login"> Đăng xuất </router-link>
              </div>
              <div class="text-xs text-gray-400 mt-2">
                Cập nhật mới nhất: 20/05/2025
              </div>
            </div>
          </template>
        </Modal>
      </div>
    </div>

    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

onMounted(() => {
  console.log("Đã đăng nhập111?", isLoggedIn.value);
});
const fullName = computed(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.fullName : "";
});
</script>

<style lang="" scoped></style>
