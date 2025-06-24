import { defineStore } from "pinia";

export const useSearchStore = defineStore("title", {
  state: () => ({
    titlePage: "Title 123123",
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
