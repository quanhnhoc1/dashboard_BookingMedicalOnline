<template>
  <footer class="bg-white border-t pt-8 pb-4">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <!-- Logo + Info -->
        <div class="md:col-span-2 flex flex-col items-start">
          <div class="flex items-center mb-2">
            <img src="/logoMepro.png" alt="medpro" class="h-14 w-auto mr-2" />
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
        <!-- Liên hệ hợp tác -->
        <div>
          <div class="font-bold mb-2">Liên hệ hợp tác</div>
          <ul class="text-sm space-y-1">
            <li>Cơ sở y tế</li>
            <li>Phòng mạch</li>
            <li>Doanh nghiệp</li>
            <li>Quảng cáo</li>
            <li>Tuyển Dụng</li>
          </ul>
        </div>
        <!-- Tin tức -->
        <div>
          <div class="font-bold mb-2">Tin tức</div>
          <ul class="text-sm space-y-1">
            <li>Tin dịch vụ</li>
            <li>Tin Y Tế</li>
            <li>Y Học thường thức</li>
          </ul>
        </div>
        <!-- Về Medpro -->
        <div>
          <div class="font-bold mb-2">Về Medpro</div>
          <ul class="text-sm space-y-1">
            <li>Giới thiệu</li>
            <li>Điều khoản dịch vụ</li>
            <li>Chính sách bảo mật</li>
            <li>Quy định sử dụng</li>
          </ul>
        </div>
      </div>

      <!-- Badges -->
      <!-- <div class="flex flex-wrap items-center gap-4 mt-8">
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
  </footer>
</template>

<script setup>
// Không cần logic
</script>

<style scoped>
footer {
  font-family: "Roboto", Arial, sans-serif;
}
</style>
