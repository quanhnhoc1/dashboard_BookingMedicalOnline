<template>
  <div class="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto mt-6 shadow">
    <div class="text-red-500 font-semibold mb-2">
      (*) Thông tin bắt buộc nhập
    </div>
    <form class="space-y-6">
      <!-- Thông tin chung -->
      <div>
        <h2 class="text-lg font-bold mb-2 border-b pb-1">Thông tin chung</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium"
              >Họ và tên (có dấu) <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              class="input-form"
              placeholder="MINH THÂN NGUYỄN" />
          </div>
          <div class="flex gap-2">
            <div class="flex-1">
              <label class="block font-medium"
                >Ngày sinh (năm/tháng/ngày)
                <span class="text-red-500">*</span></label
              >
              <div class="flex gap-2">
                <select class="input-form">
                  <option>1998</option>
                </select>
                <select class="input-form">
                  <option>3</option>
                </select>
                <select class="input-form">
                  <option>4</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label class="block font-medium"
              >Số điện thoại <span class="text-red-500">*</span></label
            >
            <input type="text" class="input-form" placeholder="0393853343" />
          </div>
          <div>
            <label class="block font-medium"
              >Giới tính <span class="text-red-500">*</span></label
            >
            <select class="input-form">
              <option>Nữ</option>
              <option>Nam</option>
              <option>Khác</option>
            </select>
          </div>
          <div>
            <label class="block font-medium"
              >Nghề nghiệp <span class="text-red-500">*</span></label
            >
            <input type="text" class="input-form" placeholder="Điều dưỡng" />
          </div>
          <div>
            <label class="block font-medium"
              >Mã định danh/CCCD/Passport
              <span class="text-red-500">*</span></label
            >
            <input type="text" class="input-form" placeholder="094012231123" />
          </div>
          <div>
            <label class="block font-medium">Địa chỉ Email</label>
            <input
              type="email"
              class="input-form"
              placeholder="htna705@gmail.com" />
          </div>
          <div>
            <label class="block font-medium">Dân tộc</label>
            <select class="input-form">
              <option>Kinh</option>
              <option>Khác</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Địa chỉ theo CCCD -->
      <div>
        <h2 class="text-lg font-bold mb-2 border-b pb-1">Địa chỉ theo CCCD</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium"
              >Tỉnh/Thành <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              class="input-form"
              placeholder="Thành phố Hà Nội" />
          </div>
          <div>
            <label class="block font-medium"
              >Quận/Huyện <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              class="input-form"
              placeholder="Huyện Chương Mỹ" />
          </div>
          <div>
            <label class="block font-medium"
              >Phường/Xã <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              class="input-form"
              placeholder="Thị trấn Xuân Mai" />
          </div>
          <div>
            <label class="block font-medium"
              >Số nhà/Tên đường/Ấp thôn xóm
              <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              class="input-form"
              placeholder="Nhà trọ Út Hồng, 171A/5 đường Vòng Cung, khu vực..." />
            <span class="text-xs text-red-400"
              >(không bao gồm tỉnh/thành, quận/huyện, phường/xã)</span
            >
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded">
          Cập nhật
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// Logic xử lý form sẽ thêm sau nếu cần
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400;
}
</style>
