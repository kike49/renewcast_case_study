import renewcastLogo from "./assets/renewcast_logo.svg";
import WindChart from "./components/WindChart";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col justify-start">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 font-display">
                Wind Power Generation Dashboard
              </h1>
              <p className="text-gray-600 mt-2 ml-2 text-lg sm:text-xl">
                This dashboard provides insights into wind power generation over time, allowing users to select different time periods and view related data. The data is loaded from an external file and measures the wind energy in half hour intervals.
              </p>
            </div>
            <a href="https://renewcast.com/" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center">
              <img src={renewcastLogo} alt="Renewcast_logo" className="h-40 w-auto object-contain"/>
            </a>
          </div>
          <WindChart />
        </div>
    </div>
  );
}

export default App;
