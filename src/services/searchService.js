import axios from "axios";
const api_search = "http://localhost:3000/search-keyword";

async function SearchKeyword(keyword) {
  try {
    const response = await axios.post(api_search, {
      keyword,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
}

export { SearchKeyword };
