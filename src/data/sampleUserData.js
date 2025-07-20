// Dữ liệu mẫu cho form thêm hồ sơ người dùng mới
export const sampleUserData = {
  // Thông tin chung
  FULL_NAME: "Nguyễn Văn An",
  PHONE: "0123456789",
  EMAIL: "nguyenvanan@email.com",
  GENDER: "male",
  JOB: "Kỹ sư",
  CCCD: "123456789012",
  ETHNIC: "Kinh",

  // Thông tin ngày sinh
  BIRTH_YEAR: 1990,
  BIRTH_MONTH: 5,
  BIRTH_DAY: 15,

  // Thông tin địa chỉ
  ADDRESS: {
    DETAILED_ADDRESS: "123 Đường ABC",
    WARD: "Phường 1",
    DISTRICT: "Quận 1",
    PROVINCE: "TP. Hồ Chí Minh",
  },
};

// Danh sách dữ liệu mẫu cho nhiều người dùng
export const sampleUsersList = [
  {
    FULL_NAME: "Nguyễn Thị Bình",
    PHONE: "0987654321",
    EMAIL: "nguyenthibinh@email.com",
    GENDER: "female",
    JOB: "Giáo viên",
    CCCD: "987654321098",
    ETHNIC: "Tày",
    BIRTH_YEAR: 1985,
    BIRTH_MONTH: 8,
    BIRTH_DAY: 20,
    ADDRESS: {
      DETAILED_ADDRESS: "456 Đường XYZ",
      WARD: "Phường 2",
      DISTRICT: "Quận 3",
      PROVINCE: "TP. Hồ Chí Minh",
    },
  },
  {
    FULL_NAME: "Trần Văn Cường",
    PHONE: "0369852147",
    EMAIL: "tranvancuong@email.com",
    GENDER: "male",
    JOB: "Bác sĩ",
    CCCD: "456789123012",
    ETHNIC: "Thái",
    BIRTH_YEAR: 1988,
    BIRTH_MONTH: 12,
    BIRTH_DAY: 3,
    ADDRESS: {
      DETAILED_ADDRESS: "789 Đường DEF",
      WARD: "Phường 5",
      DISTRICT: "Quận 7",
      PROVINCE: "TP. Hồ Chí Minh",
    },
  },
  {
    FULL_NAME: "Lê Thị Dung",
    PHONE: "0521478963",
    EMAIL: "lethidung@email.com",
    GENDER: "female",
    JOB: "Y tá",
    CCCD: "789123456012",
    ETHNIC: "Mường",
    BIRTH_YEAR: 1992,
    BIRTH_MONTH: 3,
    BIRTH_DAY: 10,
    ADDRESS: {
      DETAILED_ADDRESS: "321 Đường GHI",
      WARD: "Phường 8",
      DISTRICT: "Quận 5",
      PROVINCE: "TP. Hồ Chí Minh",
    },
  },
  {
    FULL_NAME: "Phạm Văn Em",
    PHONE: "0741258963",
    EMAIL: "phamvanem@email.com",
    GENDER: "male",
    JOB: "Kế toán",
    CCCD: "321654987012",
    ETHNIC: "Khmer",
    BIRTH_YEAR: 1987,
    BIRTH_MONTH: 7,
    BIRTH_DAY: 25,
    ADDRESS: {
      DETAILED_ADDRESS: "654 Đường JKL",
      WARD: "Phường 10",
      DISTRICT: "Quận 10",
      PROVINCE: "TP. Hồ Chí Minh",
    },
  },
  {
    FULL_NAME: "Hoàng Thị Phương",
    PHONE: "0896321475",
    EMAIL: "hoangthiphuong@email.com",
    GENDER: "female",
    JOB: "Dược sĩ",
    CCCD: "654321987012",
    ETHNIC: "Hoa",
    BIRTH_YEAR: 1995,
    BIRTH_MONTH: 11,
    BIRTH_DAY: 8,
    ADDRESS: {
      DETAILED_ADDRESS: "987 Đường MNO",
      WARD: "Phường 12",
      DISTRICT: "Quận 2",
      PROVINCE: "TP. Hồ Chí Minh",
    },
  },
];

// Dữ liệu mẫu cho các trường select
export const sampleSelectData = {
  // Danh sách nghề nghiệp
  JOBS: [
    "Kỹ sư",
    "Bác sĩ",
    "Y tá",
    "Giáo viên",
    "Kế toán",
    "Dược sĩ",
    "Luật sư",
    "Nhân viên văn phòng",
    "Thợ điện",
    "Thợ cơ khí",
    "Thợ sửa chữa",
    "Tài xế",
    "Nhân viên bán hàng",
    "Chủ doanh nghiệp",
    "Sinh viên",
    "Học sinh",
    "Nội trợ",
    "Khác",
  ],

  // Danh sách 54 dân tộc Việt Nam
  ETHNICS: [
    "Kinh",
    "Tày",
    "Thái",
    "Mường",
    "Khmer",
    "Hoa",
    "Nùng",
    "H'Mông",
    "Dao",
    "Gia Rai",
    "Ê Đê",
    "Ba Na",
    "Xơ Đăng",
    "Sán Chay",
    "Cơ Ho",
    "Chăm",
    "Sán Dìu",
    "Hrê",
    "Mnông",
    "Ra Glai",
    "Xtiêng",
    "Bru-Vân Kiều",
    "Thổ",
    "Giáy",
    "Cơ Tu",
    "Gié Triêng",
    "Mạ",
    "Khơ Mú",
    "Co",
    "Tà Ôi",
    "Chơ Ro",
    "Xinh Mun",
    "Hà Nhì",
    "Chu Ru",
    "Lào",
    "La Chí",
    "La Ha",
    "Phù Lá",
    "La Hủ",
    "Lự",
    "Lô Lô",
    "Chứt",
    "Mảng",
    "Pà Thẻn",
    "Cơ Lao",
    "Cống",
    "Bố Y",
    "Si La",
    "Pu Péo",
    "Brâu",
    "Ơ Đu",
    "Rơ Măm",
    "Khác",
  ],

  // Danh sách tỉnh/thành phố
  PROVINCES: [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
  ],

  // Danh sách quận/huyện TP.HCM
  DISTRICTS: [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Bình Tân",
    "Quận Bình Thạnh",
    "Quận Gò Vấp",
    "Quận Phú Nhuận",
    "Quận Tân Bình",
    "Quận Tân Phú",
    "Quận Thủ Đức",
    "Huyện Bình Chánh",
    "Huyện Cần Giờ",
    "Huyện Củ Chi",
    "Huyện Hóc Môn",
    "Huyện Nhà Bè",
  ],

  // Danh sách phường/xã
  WARDS: [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
    "Phường 13",
    "Phường 14",
    "Phường 15",
    "Phường 16",
    "Phường 17",
    "Phường 18",
  ],
};

// Hàm tạo dữ liệu ngẫu nhiên
export function generateRandomUser() {
  const names = [
    "Nguyễn Văn An",
    "Trần Thị Bình",
    "Lê Văn Cường",
    "Phạm Thị Dung",
    "Hoàng Văn Em",
    "Vũ Thị Phương",
    "Đặng Văn Giang",
    "Bùi Thị Hoa",
    "Đỗ Văn Inh",
    "Hồ Thị Kim",
    "Ngô Văn Long",
    "Dương Thị Mai",
    "Lý Văn Nam",
    "Võ Thị Oanh",
    "Trịnh Văn Phúc",
    "Đinh Thị Quỳnh",
  ];

  const jobs = sampleSelectData.JOBS;
  const ethnics = sampleSelectData.ETHNICS;
  const provinces = sampleSelectData.PROVINCES;
  const districts = sampleSelectData.DISTRICTS;
  const wards = sampleSelectData.WARDS;

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
  const randomEthnic = ethnics[Math.floor(Math.random() * ethnics.length)];
  const randomProvince =
    provinces[Math.floor(Math.random() * provinces.length)];
  const randomDistrict =
    districts[Math.floor(Math.random() * districts.length)];
  const randomWard = wards[Math.floor(Math.random() * wards.length)];

  // Tạo số điện thoại ngẫu nhiên
  const phone = "0" + Math.floor(Math.random() * 900000000 + 100000000);

  // Tạo CCCD ngẫu nhiên
  const cccd = Math.floor(
    Math.random() * 900000000000 + 100000000000
  ).toString();

  // Tạo email từ tên
  const email = randomName.toLowerCase().replace(/\s+/g, "") + "@email.com";

  // Tạo ngày sinh ngẫu nhiên (18-65 tuổi)
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - Math.floor(Math.random() * 47 + 18);
  const birthMonth = Math.floor(Math.random() * 12 + 1);
  const birthDay = Math.floor(Math.random() * 28 + 1);

  return {
    FULL_NAME: randomName,
    PHONE: phone,
    EMAIL: email,
    GENDER: Math.random() > 0.5 ? "male" : "female",
    JOB: randomJob,
    CCCD: cccd,
    ETHNIC: randomEthnic,
    BIRTH_YEAR: birthYear,
    BIRTH_MONTH: birthMonth,
    BIRTH_DAY: birthDay,
    ADDRESS: {
      DETAILED_ADDRESS: `${Math.floor(Math.random() * 999) + 1} Đường ABC`,
      WARD: randomWard,
      DISTRICT: randomDistrict,
      PROVINCE: randomProvince,
    },
  };
}

// Hàm tạo nhiều dữ liệu ngẫu nhiên
export function generateRandomUsers(count = 10) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateRandomUser());
  }
  return users;
}
