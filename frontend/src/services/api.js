import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 15000 // in ms
});

// Fetch the earliest and older dates available on the dataset
export const fetchDates = async () => {
  try {
    const response = await api.get("/cap-dates/");
    return {
      minDate: new Date(response.data.min_date),
      maxDate: new Date(response.data.max_date)
    };
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Fetch the data with given start and end date filters as args
export const fetchWindData = async (startDate, endDate) => {
  try {
    const response = await api.get("/", {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};
