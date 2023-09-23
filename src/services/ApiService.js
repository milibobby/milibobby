import axios from "axios";

const BASE_URL = "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099";

async function fetchRestaurantNames() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant names:", error);
    throw error;
  }
}

async function fetchRestaurantData() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    throw error;
  }
}

async function fetchAddonsData(dishId) {
  try {
    const response = await fetch(
      `http://snapittapp.snapitt.net/api/menu/30/?org=1010000001&branch_id=1000000001&menuItem=${dishId}&limit=10&offset=20&lang=en`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Addon Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching addons data:", error);
    return [];
  }
}

export { fetchRestaurantNames, fetchRestaurantData, fetchAddonsData };
