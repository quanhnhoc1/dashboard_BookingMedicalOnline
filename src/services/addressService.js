// services/addressService.js
import axios from "axios";

const url_get_provinces = "http://localhost:3000/provinces";
const url_get_districts = "http://localhost:3000/districts";
const url_get_wards = "http://localhost:3000/wards";

export const fetchProvinces = async () => {
  const res = await axios.get(url_get_provinces);
  return res.data;
};

export const fetchDistricts = async (province) => {
  const res = await axios.get(url_get_districts, {
    params: { province },
  });
  return res.data;
};

export const fetchWards = async (province, district) => {
  const res = await axios.get(url_get_wards, {
    params: { province, district },
  });
  return res.data;
};
