import { defineStore } from "pinia";
import {
  fetchDistricts as getDistricts,
  fetchProvinces as getProvinces,
  fetchWards as getWards,
} from "@/services/addressService";
export const useAddressStore = defineStore("address", {
  state: () => ({
    provinces: [],
    districts: [],
    wards: [],
    selectedProvince: "",
    selectedDistrict: "",
    selectedWard: "",
    detailedAddress: "",
  }),
  actions: {
    async fetchProvinces() {
      this.provinces = await getProvinces();
    },
    async fetchDistricts() {
      if (!this.selectedProvince) return;
      this.districts = await getDistricts(this.selectedProvince);
      this.selectedDistrict = "";
      this.wards = [];
      this.selectedWard = "";
    },
    async fetchWards() {
      if (!this.selectedProvince || !this.selectedDistrict) return;
      this.wards = await getWards(this.selectedProvince, this.selectedDistrict);
      this.selectedWard = "";
    },
  },
});
