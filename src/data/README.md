# Dữ liệu mẫu cho Form Thêm Hồ Sơ Người Dùng

## Tổng quan

Thư mục này chứa các file dữ liệu mẫu để hỗ trợ việc phát triển và testing form thêm hồ sơ người dùng mới.

## Cấu trúc dữ liệu

### 1. `sampleUserData.js`

File này chứa:

- **sampleUserData**: Dữ liệu mẫu cho một người dùng
- **sampleUsersList**: Danh sách 5 người dùng mẫu có sẵn
- **sampleSelectData**: Dữ liệu cho các dropdown (nghề nghiệp, dân tộc)
- **generateRandomUser()**: Hàm tạo dữ liệu người dùng ngẫu nhiên
- **generateRandomUsers(count)**: Hàm tạo nhiều người dùng ngẫu nhiên

### 2. Cấu trúc dữ liệu người dùng

```javascript
{
  FULL_NAME: "Họ và tên",
  PHONE: "Số điện thoại",
  EMAIL: "Email",
  GENDER: "male" | "female",
  JOB: "Nghề nghiệp",
  CCCD: "Số CCCD/Passport",
  ETHNIC: "Dân tộc",
  BIRTH_YEAR: 1990,
  BIRTH_MONTH: 5,
  BIRTH_DAY: 15,
  ADDRESS: {
    DETAILED_ADDRESS: "Địa chỉ chi tiết",
    WARD: "Phường/Xã",
    DISTRICT: "Quận/Huyện",
    PROVINCE: "Tỉnh/Thành phố"
  }
}
```

## Cách sử dụng

### 1. Import dữ liệu mẫu

```javascript
import {
  sampleUserData,
  sampleUsersList,
  generateRandomUser,
  generateRandomUsers,
  sampleSelectData,
} from "@/data/sampleUserData.js";
```

### 2. Sử dụng dữ liệu mẫu cố định

```javascript
// Sử dụng dữ liệu mẫu đơn lẻ
const userData = sampleUserData;

// Sử dụng từ danh sách
const firstUser = sampleUsersList[0];
```

### 3. Tạo dữ liệu ngẫu nhiên

```javascript
// Tạo một người dùng ngẫu nhiên
const randomUser = generateRandomUser();

// Tạo 10 người dùng ngẫu nhiên
const randomUsers = generateRandomUsers(10);
```

### 4. Sử dụng trong component

```vue
<template>
  <addNewUserProfileFrom :user="currentUser" :addressStore="addressStore" />
</template>

<script setup>
import { reactive } from "vue";
import { sampleUserData } from "@/data/sampleUserData.js";

const currentUser = reactive({
  FULL_NAME: sampleUserData.FULL_NAME,
  PHONE: sampleUserData.PHONE,
  EMAIL: sampleUserData.EMAIL,
  GENDER: sampleUserData.GENDER,
  JOB: sampleUserData.JOB,
  CCCD: sampleUserData.CCCD,
  ETHNIC: sampleUserData.ETHNIC,
});

const addressStore = reactive({
  detailedAddress: sampleUserData.ADDRESS.DETAILED_ADDRESS,
  selectedWard: sampleUserData.ADDRESS.WARD,
  selectedDistrict: sampleUserData.ADDRESS.DISTRICT,
  selectedProvince: sampleUserData.ADDRESS.PROVINCE,
});
</script>
```

## Demo Component

Component `addNewUserProfileFrom.vue` đã tích hợp sẵn demo controls. Sử dụng trực tiếp:

```vue
<template>
  <addNewUserProfileFrom />
</template>

<script setup>
import addNewUserProfileFrom from "@/components/addNewUserProfileFrom.vue";
</script>
```

## Tính năng của Demo

1. **Tải dữ liệu mẫu**: Load dữ liệu mẫu cố định
2. **Tạo dữ liệu ngẫu nhiên**: Tạo người dùng với thông tin ngẫu nhiên
3. **Chọn từ danh sách**: Chọn người dùng từ danh sách có sẵn
4. **Xóa form**: Reset form về trạng thái ban đầu
5. **Hiển thị dữ liệu**: Xem dữ liệu hiện tại trong form

## Dữ liệu mẫu có sẵn

### Danh sách nghề nghiệp

- Kỹ sư, Bác sĩ, Y tá, Giáo viên, Kế toán, Dược sĩ, Luật sư, v.v.

### Danh sách dân tộc

- Kinh, Tày, Thái, Mường, Khmer, Hoa, Nùng, H'Mông, Dao, v.v.

### Người dùng mẫu

1. **Nguyễn Văn An** - Kỹ sư
2. **Nguyễn Thị Bình** - Giáo viên
3. **Trần Văn Cường** - Bác sĩ
4. **Lê Thị Dung** - Y tá
5. **Phạm Văn Em** - Kế toán
6. **Hoàng Thị Phương** - Dược sĩ

## Lưu ý

- Dữ liệu mẫu chỉ dùng cho mục đích development và testing
- Thông tin cá nhân trong dữ liệu mẫu là giả định
- Có thể tùy chỉnh và mở rộng dữ liệu mẫu theo nhu cầu
