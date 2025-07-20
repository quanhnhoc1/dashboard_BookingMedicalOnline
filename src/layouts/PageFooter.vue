<template>
  <footer class="relative w-full pt-12">
    <hr class="m-4" />
    <div class="max-w-[1170px] mx-auto px-4">
      <!-- Grid content -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <!-- Logo + Info -->
        <div class="md:col-span-2 flex flex-col items-start">
          <div class="flex items-center mb-2">
            <div>
              <div class="text-sky-500 text-4xl font-bold leading-none">
                medpro
              </div>
              <div class="text-sky-400 text-lg tracking-widest font-medium">
                Đặt khám nhanh
              </div>
            </div>
          </div>
          <div class="text-sm mt-2">
            <div>
              <span class="font-bold">Địa chỉ:</span> 236/29/18 Điện Biên Phủ -
              Phường 17 - Quận Bình Thạnh - TPHCM.
            </div>
            <div>
              <span class="font-bold">Website:</span>
              <a href="https://medpro.vn" class="text-sky-500 hover:underline"
                >https://medpro.vn</a
              >
            </div>
            <div>
              <span class="font-bold">Email:</span>
              <a
                href="mailto:cskh@medpro.vn"
                class="text-sky-500 hover:underline"
                >cskh@medpro.vn</a
              >
            </div>
            <div>
              <span class="font-bold">Điện thoại:</span> (028) 710 78098
            </div>
          </div>
        </div>

        <!-- Dịch vụ Y tế -->
        <div>
          <div class="font-bold mb-2">Dịch vụ Y tế</div>
          <ul class="text-sm space-y-1">
            <li>Đặt khám tại cơ sở</li>
            <li>Đặt khám chuyên khoa</li>
            <li>Gọi video với bác sĩ</li>
            <li>Đặt khám theo bác sĩ</li>
            <li>Mua thuốc tại An Khang</li>
            <li>Giúp việc cá nhân</li>
            <li>Đặt lịch xét nghiệm</li>
            <li>Gói khám sức khỏe</li>
            <li>Y tế tại nhà</li>
            <li>Đặt lịch tiêm chủng</li>
            <li>Đặt khám ngoài giờ</li>
            <li>Khám sức khỏe thông tư</li>
            <li>Thanh toán Viện phí</li>
          </ul>
        </div>

        <!-- Cơ sở y tế -->
        <div>
          <div class="font-bold mb-2">Cơ sở y tế</div>
          <ul class="text-sm space-y-1">
            <li>Bệnh viện công</li>
            <li>Bệnh viện tư</li>
            <li>Phòng khám</li>
            <li>Phòng mạch</li>
            <li>Xét nghiệm</li>
            <li>Y tế tại nhà</li>
            <li>Tiêm chủng</li>
          </ul>
        </div>

        <!-- Hướng dẫn -->
        <div>
          <div class="font-bold mb-2">Hướng dẫn</div>
          <ul class="text-sm space-y-1">
            <li>Cài đặt ứng dụng</li>
            <li>Đặt lịch khám</li>
            <li>Tư vấn khám bệnh qua video</li>
            <li>Quy trình hoàn phí</li>
            <li>Câu hỏi thường gặp</li>
            <li>Quy trình đi khám</li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mt-8">
        <div></div>
        <!-- Các cột khác nếu cần -->
      </div>
      <div class="flex justify-center mb-4">
        <!-- <div class="flex gap-4">
          <img
            src="https://medpro.vn/images/dang-ky-bo-cong-thuong.png"
            alt="Đã đăng ký Bộ Công Thương"
            class="h-8" />
          <img
            src="https://medpro.vn/images/thong-bao-bo-cong-thuong.png"
            alt="Đã thông báo Bộ Công Thương"
            class="h-8" />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            class="h-10" />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            class="h-10" />
        </div> -->
      </div>
    </div>

    <!-- Main Footer Bar: Blue full width -->
    <div class="bg-sky-400 text-white py-4 w-full">
      <div
        class="max-w-[1170px] mx-auto px-4 flex items-center justify-between">
        <!-- Left: Copyright -->
        <div class="text-sm">
          © 2020 - Bản quyền thuộc Công Ty Cổ Phần Ứng Dụng PKH
        </div>
        <!-- Center: Official Badges -->
        <div class="flex items-center gap-4">
          <!-- DMCA Protected Badge -->
          <div
            class="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.9V15.5C16,16.3 15.4,16.9 14.8,16.9H9.2C8.6,16.9 8,16.3 8,15.5V12.9C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
            </svg>
            <span class="text-xs font-semibold">DMCA PROTECTED</span>
          </div>
          <!-- Ministry of Industry and Trade Badge -->
          <div class="bg-white text-gray-800 px-3 py-2 rounded-lg text-center">
            <div class="text-xs font-semibold">ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG</div>
            <div class="text-xs">ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</div>
          </div>
        </div>
        <!-- Right: Empty space for floating button -->
        <div class="w-48"></div>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <div
      class="fixed bottom-20 right-4 z-50 flex flex-col gap-3 max-w-[1170px] mx-auto">
      <!-- Top FAB: Droplet/Water Drop -->
      <button
        class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
        <svg
          class="w-6 h-6 text-sky-400"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
        </svg>
      </button>
      <!-- Bottom FAB: Phone -->
      <button
        class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
        <svg
          class="w-6 h-6 text-sky-400"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
        </svg>
      </button>
    </div>
    <!-- Floating Consultation Button -->
    <div class="fixed bottom-4 right-4 z-50 max-w-[1170px] mx-auto">
      <button
        class="bg-sky-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-sky-500 transition-colors flex items-center gap-3">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18" />
        </svg>
        <span class="text-sm font-semibold">TƯ VẤN ĐẶT KHÁM TRỰC TUYẾN</span>
      </button>
    </div>
  </footer>
</template>

<script setup>
// Footer component không cần logic phức tạp
</script>

<style scoped>
footer {
  margin-top: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Hide badges on mobile */
  .flex.items-center.gap-4 {
    display: none;
  }

  /* Adjust floating buttons position */
  .fixed.bottom-20.right-4 {
    bottom: 16rem;
    right: 1rem;
  }

  .fixed.bottom-4.right-4 {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
