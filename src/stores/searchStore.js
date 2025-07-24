import { defineStore } from "pinia";
import { SearchKeyword as searchKeywordService } from "@/services/searchService.js";
export const useSearchStore = defineStore("search", {
  state: () => ({
    titlePage: "Cơ Sở Y Tế",
    searchPlaceholder: "Tìm kiếm bác sĩ, chuyên khoa, bệnh viện...",
    doctorResults: [],
    hospitalResults: [],
    clinicResults: [],
    specialtyResults: [],
    isLoading: false,
    searchQuery: "",
  }),
  actions: {
    setTitlePage(title) {
      this.titlePage = title;
    },
    setSearchPlaceholder(placeholder) {
      this.searchPlaceholder = placeholder;
    },
    async searchKeyword(keyword) {
      try {
        this.isLoading = true;
        this.searchQuery = keyword;

        console.log("Searching for keyword:", keyword);

        // Gọi API search
        const response = await searchKeywordService(keyword);
        console.log("Search API response:", response);

        // Cập nhật kết quả từ response
        this.doctorResults = response.doctors || [];
        this.hospitalResults = response.hospitals || [];
        this.clinicResults = response.clinics || [];
        this.specialtyResults = response.specialties || [];

        console.log("Updated store results:", {
          doctors: this.doctorResults.length,
          hospitals: this.hospitalResults.length,
          clinics: this.clinicResults.length,
          specialties: this.specialtyResults.length,
        });

        return {
          doctors: this.doctorResults,
          hospitals: this.hospitalResults,
          clinics: this.clinicResults,
          specialties: this.specialtyResults,
        };
      } catch (err) {
        console.error("Search error:", err);
        // Clear results on error
        this.doctorResults = [];
        this.hospitalResults = [];
        this.clinicResults = [];
        this.specialtyResults = [];
        throw err.response?.data?.message || "Không thể tìm kiếm";
      } finally {
        this.isLoading = false;
      }
    },

    clearResults() {
      this.doctorResults = [];
      this.hospitalResults = [];
      this.clinicResults = [];
      this.specialtyResults = [];
      this.searchQuery = "";
    },
  },
});
