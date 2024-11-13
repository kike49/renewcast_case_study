import { useEffect, useState } from "react";
import { fetchWindData, fetchDates } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LoadingSpinner from "./LoadingSpinner"
import { MAX_DATE_RANGE_DAYS } from "../constants/global";


const WindChart = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [fetchData, setFetchData] = useState(false);


  // First useEffect to load the min and max dates and assign them to initials startDate and endDate. Runs once at page load
  useEffect(() => {
    const loadDates = async () => {
      try {
        const { minDate, maxDate } = await fetchDates();
        setMinDate(minDate);
        setMaxDate(maxDate);
        // set default start and end dates
        const defaultEndDate = new Date(minDate.getTime() + MAX_DATE_RANGE_DAYS * 24 * 60 * 60 * 1000);
        setStartDate(minDate);
        setEndDate(defaultEndDate);
      } catch (err) {
        console.error("Error loading dates: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDates();
  }, []);


  // Second useEffect to fetch the data from the file given a date range. Runs every time the fetch data button is clicked
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (startDate && endDate) {
          const data = await fetchWindData(startDate, endDate);
          setData(data);
        }
      } catch (err) {
        console.error("Error loading data: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // Trigger the function every time the fetch button is clicked (fetchData become True)
    if (fetchData) {
      loadData();
      setFetchData(false);
    }
  }, [fetchData]);


  // Function to handle the data input change
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    const date = new Date(value);
    const isStartDate = name === "startDate";
    const isDateInRange = (date) => date >= minDate && date <= maxDate;
    const isValidDateRange = (start, end) => {
      const daysDifference = (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);
      return daysDifference <= MAX_DATE_RANGE_DAYS
    };
    // Dates out of range (maxDate and minDate) handle on the undefined message in HTML, prevents the error shown while typing the date instead of choosing it from calendar widget
    if (!isDateInRange(date)) {
      setData(undefined)
      return;
    }
    // End date before start date
    if (!isStartDate && startDate && date < startDate) {
      setError("End date cannot be before start date");
      return;
    }
    // Start date after end date
    if (isStartDate && endDate && date > endDate) {
      setError("Start date cannot be after end date");
      return;
    }
    // Date range exceeded
    if (!isStartDate && !isValidDateRange(startDate, date)) {
      setError(`Date range cannot exceed ${MAX_DATE_RANGE_DAYS} days`);
      return;
    }
    isStartDate ? setStartDate(date) : setEndDate(date);
    setError(null);
  };


  // Function to set the fetchData to True once clicked the button
  const handleFetchData = () => {
    setFetchData(true);
  };


  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-8">
        <div className="flex flex-col w-full md:w-64">
          <label className="text-sm font-semibold text-gray-700 mb-2">Start date:</label>
          <input
            type="date"
            name="startDate"
            min={minDate?.toISOString().split("T")[0]} // toISOString returns YYYY-MM-DDTHH:MM:SS.sssZ, take the first part before 'T'
            max={maxDate?.toISOString().split("T")[0]}
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={handleDateChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col w-full md:w-64">
          <label className="text-sm font-semibold text-gray-700 mb-2">End date:</label>
          <input
            type="date"
            name="endDate"
            min={minDate?.toISOString().split("T")[0]}
            max={maxDate?.toISOString().split("T")[0]}
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={handleDateChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col w-full md:w-auto md:self-end">
        <button
          onClick={handleFetchData}
          disabled={!startDate || !endDate || startDate > endDate || error !== null}
          className={`p-2 px-6 rounded-lg text-white font-semibold w-full md:w-auto ${
            !startDate || !endDate || startDate > endDate || error !== null
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Fetch data
        </button>
        </div>
      </div>
      <div className="mt-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : data === undefined ? (
          <p className="text-gray-500 text-center">
            Choose dates from the calendar icon within a valid range (up to {MAX_DATE_RANGE_DAYS} days) and click the fetch button to display the chart. Remember dates must be between {minDate.toLocaleDateString('en-GB')} and {maxDate.toLocaleDateString('en-GB')}
          </p>
        ) : !data.length ? (
          <p className="text-gray-500 text-center">No data available</p>
        ) : (
          <div className="mt-4 mb-8">
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis
                  dataKey="timestamp"
                  type="category"
                  tickFormatter={(timestamp) => {
                    const date = new Date(timestamp);
                    return date.toLocaleDateString();
                  }}
                  label={{
                    value: "Date",
                    position: "bottom",
                    offset: 40,
                    style: { fontSize: "18px", fontWeight: "bold" }
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={50} // reduces the chart so labels are shown
                />
                <YAxis
                  label={{
                    value: "Wind power (MW)",
                    angle: -90,
                    position: "center",
                    dx: -30,
                    style: { fontSize: "18px", fontWeight: "bold" }
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  labelFormatter={(timestamp) => {
                    const date = new Date(timestamp);
                    return `Date: ${date.toLocaleString("en-UK")}`;
                  }}
                  formatter={(value) => [value, "Wind power (MW)"]}
                />
                <Line type="monotone" dataKey="wind_mw" stroke="#8884d8" dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default WindChart;
