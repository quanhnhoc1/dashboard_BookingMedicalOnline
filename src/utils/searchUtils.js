/**
 * Utility functions for search functionality
 * Hỗ trợ tìm kiếm không phân biệt chữ hoa/thường và có dấu/không dấu
 */

/**
 * Chuẩn hóa chuỗi để tìm kiếm không phân biệt chữ hoa/thường và có dấu/không dấu
 * @param {string} str - Chuỗi cần chuẩn hóa
 * @returns {string} - Chuỗi đã chuẩn hóa
 */
export function normalizeString(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .toLowerCase()
    .trim();
}

/**
 * Kiểm tra xem một chuỗi có chứa từ khóa tìm kiếm hay không
 * @param {string} text - Văn bản cần kiểm tra
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {boolean} - true nếu tìm thấy, false nếu không
 */
export function containsKeyword(text, keyword) {
  if (!text || !keyword) return false;

  const normalizedText = normalizeString(text);
  const normalizedKeyword = normalizeString(keyword);

  return normalizedText.includes(normalizedKeyword);
}

/**
 * Tìm kiếm trong một mảng objects với nhiều trường
 * @param {Array} items - Mảng objects cần tìm kiếm
 * @param {string} keyword - Từ khóa tìm kiếm
 * @param {Array} fields - Các trường cần tìm kiếm
 * @returns {Array} - Mảng kết quả đã lọc
 */
export function searchInArray(items, keyword, fields = []) {
  if (!keyword || !items || items.length === 0) return items;

  const normalizedKeyword = normalizeString(keyword);

  return items.filter((item) => {
    return fields.some((field) => {
      const fieldValue = item[field];
      if (!fieldValue) return false;

      const normalizedFieldValue = normalizeString(fieldValue.toString());
      return normalizedFieldValue.includes(normalizedKeyword);
    });
  });
}

/**
 * Tìm kiếm trong một mảng objects với các trường mặc định cho bác sĩ
 * @param {Array} doctors - Mảng bác sĩ
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Array} - Mảng bác sĩ đã lọc
 */
export function searchDoctors(doctors, keyword) {
  if (!keyword || !doctors || doctors.length === 0) return doctors;

  const searchFields = [
    "doctorName",
    "fullName",
    "phone",
    "email",
    "degree",
    "specialtyName",
    "hospitalName",
    "address",
    "description",
  ];

  return searchInArray(doctors, keyword, searchFields);
}

/**
 * Tìm kiếm trong một mảng objects với các trường mặc định cho bệnh viện
 * @param {Array} hospitals - Mảng bệnh viện
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Array} - Mảng bệnh viện đã lọc
 */
export function searchHospitals(hospitals, keyword) {
  if (!keyword || !hospitals || hospitals.length === 0) return hospitals;

  const searchFields = ["name", "address", "description"];

  return searchInArray(hospitals, keyword, searchFields);
}

/**
 * Tìm kiếm trong một mảng objects với các trường mặc định cho chuyên khoa
 * @param {Array} specialties - Mảng chuyên khoa
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Array} - Mảng chuyên khoa đã lọc
 */
export function searchSpecialties(specialties, keyword) {
  if (!keyword || !specialties || specialties.length === 0) return specialties;

  const searchFields = ["specialtyName", "name", "description"];

  return searchInArray(specialties, keyword, searchFields);
}

/**
 * Highlight từ khóa tìm kiếm trong văn bản
 * @param {string} text - Văn bản gốc
 * @param {string} keyword - Từ khóa cần highlight
 * @returns {string} - Văn bản với HTML highlight
 */
export function highlightKeyword(text, keyword) {
  if (!text || !keyword) return text;

  const normalizedText = normalizeString(text);
  const normalizedKeyword = normalizeString(keyword);

  if (!normalizedText.includes(normalizedKeyword)) return text;

  // Tìm vị trí của từ khóa trong văn bản gốc
  const regex = new RegExp(
    `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}

/**
 * Tạo search object với thông tin chuẩn hóa
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {object} - Object chứa thông tin tìm kiếm
 */
export function createSearchObject(keyword) {
  return {
    original: keyword.trim(),
    normalized: normalizeString(keyword),
  };
}
