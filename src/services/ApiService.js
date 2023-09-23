import axios from "axios";

const RESTAURANT_NAMES_URL =
  "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099";
const RESTAURANT_DATA_URL =
  "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099"; // Replace with the correct URL for restaurant data

async function fetchRestaurantNames() {
  try {
    const response = await axios.get(RESTAURANT_NAMES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant names:", error);
    throw error;
  }
}

async function fetchRestaurantData() {
  try {
    const response = await axios.get(RESTAURANT_DATA_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    throw error;
  }
}

export { fetchRestaurantNames, fetchRestaurantData };
