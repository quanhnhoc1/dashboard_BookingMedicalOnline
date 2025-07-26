import { defineStore } from "pinia";
import {
  getDoctorFromSpecialtyIDServicesAndIDHospital,
  getHospitalsPrivate as getHospitalsPrivateAPI,
  getAllHospitals as getAllHospitalsAPI,
  getAllSpecialties as getAllSpecialtiesAPI,
} from "../services/hospitalService.js";
import { getHospitalsPublic as getHospitalsPublicAPI } from "../services/hospitalService.js";
import { getSpecialtiesWithHospitalID } from "../services/hospitalService.js";

export const userHospitalsStore = defineStore("hospitals", {
  state: () => ({
    selectedHospital: null,
    selectedSpecialty: null,
    selectedDoctor: null,
    specialties: [],
    selectedSchedule: null, // Thêm selectedSchedule
    allSpecialties: [],
    allHospitals: [],
  }),
  getters: {},
  actions: {
    async getHospitalsPrivate() {
      try {
        const res = await getHospitalsPrivateAPI();
        console.log(res);
        return res;
      } catch (error) {
        console.error("Error fetching private hospitals:", error);
        throw error;
      }
    },
    async getHospitalsPublic() {
      try {
        const res = await getHospitalsPublicAPI();
        return res;
      } catch (error) {
        console.error("Error fetching public hospitals:", error);
        throw error;
      }
    },
    setSelectedSpecialty(specialty) {
      this.selectedSpecialty = specialty;
    },
    setHospital(hospital) {
      this.selectedHospital = hospital;
    },
    setSelectedDoctor(doctor) {
      this.selectedDoctor = doctor;
    },
    setSelectedSchedule(schedule) {
      this.selectedSchedule = schedule;
    },
    clearHospital() {
      this.selectedHospital = null;
    },
    clearAllData() {
      this.selectedHospital = null;
      this.selectedSpecialty = null;
      this.selectedDoctor = null;
      this.selectedSchedule = null;
      this.specialties = [];
    },
    clearSpecialties() {
      this.specialties = [];
    },

    async getSpecialtiesWithHospitalID(hospitalID) {
      // Clear specialties cũ để tránh cache sai
      this.specialties = [];

      try {
        const res = await getSpecialtiesWithHospitalID(hospitalID);
        this.specialties = res;
        return res;
      } catch (err) {
        console.error(
          "Error fetching specialties for hospital ID:",
          hospitalID,
          err
        );
        throw err;
      }
    },
    async getDoctorsWithSpecialtyIDAndHospitalID(specialtyID, hospitalID) {
      try {
        const res = await getDoctorFromSpecialtyIDServicesAndIDHospital(
          specialtyID,
          hospitalID
        );
        return res;
      } catch (error) {
        throw error;
      }
    },

    async getAllHospitals() {
      try {
        const res = await getAllHospitalsAPI();
        this.allHospitals = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getAllSpecialties() {
      try {
        const res = await getAllSpecialtiesAPI();
        this.allSpecialties = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: true,
});
