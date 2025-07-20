import { defineStore } from "pinia";

export const useSearchStore = defineStore("title", {
  state: () => ({
    titlePage: "Cơ Sở Y Tế",
    searchPlaceholder: "Tìm kiếm bác sĩ, chuyên khoa, bệnh viện...",
  }),
  actions: {
    setTitlePage(title) {
      this.titlePage = title;
    },
    setSearchPlaceholder(placeholder) {
      this.searchPlaceholder = placeholder;
    },
  },
});
