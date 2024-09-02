"use client";
import React, { useEffect, useState } from 'react';
import Hero from '@/components/hero';
import styles from './Dashboard.module.css'; // Import the custom CSS module

export default function Dashboard() {
  const [lastData, setLastData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [luxValue, setLuxValue] = useState('');
  const [temperatureValue, setTemperatureValue] = useState('');
  const [raindropStatus, setRaindropStatus] = useState('');
  const [raindropValue, setRaindropValue] = useState('');
  const [vibrationStatus, setVibrationStatus] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState('');

  const handleDiagnose = () => {
    let result = '';
  
    // Diagnose light conditions
    result += diagnoseLuxCondition();
    
    // Diagnose temperature conditions
    result += diagnoseTemperatureCondition();
    
    // Diagnose raindrop status and value
    result += diagnoseRaindropStatus();
    result += diagnoseRaindropValue();
    
    // Diagnose vibration status
    result += diagnoseVibrationStatus();
    
    // Add overall summary
    result += getOverallDiagnosis();

    // Set the final diagnosis result
    setDiagnosisResult(result || 'System seems to be functioning normally.');
};

// Diagnose light conditions
const diagnoseLuxCondition = () => {
    if (luxValue === 'Day') {
      return '';
    } else if (luxValue === 'Night') {
      return 'System might be experiencing low light conditions. ';
    }
    return '';
};

// Diagnose temperature conditions
const diagnoseTemperatureCondition = () => {
    if (temperatureValue === 'Low Temp') {
      return 'The system is experiencing low temperatures (cold). ';
    } else if (temperatureValue === 'High Temp') {
      return 'The system is experiencing high temperatures (hot). ';
    }
    return '';
};

// Diagnose raindrop status
const diagnoseRaindropStatus = () => {
    if (raindropStatus === 'Raindrop Detected') {
      return 'Raindrop detected. ';
    } else if (raindropStatus === 'No Raindrop') {
      return 'No raindrop detected. ';
    }
    return '';
};

// Diagnose raindrop value
const diagnoseRaindropValue = () => {
    if (raindropValue > 30000) {
      return 'Raindrop value is high, indicating the environment is very dry. ';
    } else if (raindropValue <= 30000) {
      return 'Raindrop value is low, indicating the environment is wet. ';
    }
    return '';
};

// Diagnose vibration status
const diagnoseVibrationStatus = () => {
    if (vibrationStatus === 'Vibration Detected') {
      return 'Vibration detected. ';
    } else if (vibrationStatus === 'No Vibration') {
      return 'No vibration detected. ';
    }
    return '';
};

// Get overall diagnosis
const getOverallDiagnosis = () => {
    let overallDiagnosis = '';

    // Example scenarios for overall diagnosis
    if (luxValue === 'Night' && temperatureValue === 'Low Temp' && raindropStatus === 'Raindrop Detected' && vibrationStatus === 'Vibration Detected') {
        overallDiagnosis = 'Problem: System down due to heavy storm (high rain value and detected vibration with low lux and temperature). ';
    } else if (luxValue === 'Night' && temperatureValue === 'Low Temp') {
        overallDiagnosis = 'Problem: System could be cold and dark, possibly indicating issues with temperature and light conditions. ';
    } else if (raindropStatus === 'Raindrop Detected' && raindropValue > 30000) {
        overallDiagnosis = 'Problem: High raindrop value detected, which indicates a very dry environment. ';
    } else if (vibrationStatus === 'Vibration Detected') {
        overallDiagnosis = 'Problem: Vibration detected, which could indicate mechanical issues. ';
    } else if (luxValue === 'Day' && temperatureValue === 'High Temp') {
        overallDiagnosis = 'System is in normal operating conditions with bright light and high temperature. ';
    }

    return overallDiagnosis;
};


  // Fetch latest data for the bar charts
  async function fetchLastData() {
    try {
      const res = await fetch("/api/lastestData");
      const data = await res.json();

      if (Array.isArray(data)) {
        setLastData(data);
      } else {
        console.error("Unexpected data format for latest data:", data);
        setLastData([]);
      }

      console.log("Latest Data:", data);
    } catch (error) {
      console.error("Error fetching latest data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch all data for the line charts
  async function fetchAllData() {
    try {
      const res = await fetch("/api/alldata");
      const data = await res.json();

      if (Array.isArray(data)) {
        setAllData(data);
      } else {
        console.error("Unexpected data format for all data:", data);
        setAllData([]);
      }

      console.log("All Data:", data);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  }

  useEffect(() => {
    fetchLastData();
    fetchAllData();
    const interval = setInterval(fetchLastData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="mt-20">
      <Hero />

      <div className="flex justify-center mt-10">
        <div
          className={`w-full max-w-6xl p-10 rounded-3xl bg-gray-900 border-4 border-transparent shadow-2xl backdrop-blur-lg ${styles.animatedBorder}`}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {loading ? (
              <div className="text-white text-center">Loading...</div>
            ) : (
              <>
                {lastData.map((ldata) => (
                  <div key={ldata.id} className="rounded-xl p-6 text-center">
                    <div className="text-gray-400 text-lg font-semibold mb-2">LUX</div>
                    <div className="text-white text-2xl font-bold">
                      {ldata.lux}
                    </div>
                  </div>
                ))}

                {lastData.map((ldata) => (
                  <div key={ldata.id} className="rounded-xl p-6 text-center">
                    <div className="text-gray-400 text-lg font-semibold mb-2">Temperature</div>
                    <div className="text-white text-2xl font-bold">
                      {ldata.temperature}
                    </div>
                  </div>
                ))}

                {lastData.map((ldata) => (
                  <div key={ldata.id} className="rounded-xl p-6 text-center">
                    <div className="text-gray-400 text-lg font-semibold mb-2">Raindrop Status</div>
                    <div className="text-white text-2xl font-bold">
                      {ldata.raindrop_status}
                    </div>
                  </div>
                ))}

                {lastData.map((ldata) => (
                  <div key={ldata.id} className="rounded-xl p-6 text-center">
                    <div className="text-gray-400 text-lg font-semibold mb-2">Raindrop Value</div>
                    <div className="text-white text-2xl font-bold">
                      {ldata.raindrop_value}
                    </div>
                  </div>
                ))}

                {lastData.map((ldata) => (
                  <div key={ldata.id} className="rounded-xl p-6 text-center">
                    <div className="text-gray-400 text-lg font-semibold mb-2">Vibration Status</div>
                    <div className="text-white text-2xl font-bold">
                      {ldata.vibration_status}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Diagnosis Section */}
<div className="mt-10 p-10 bg-gray-800 rounded-3xl shadow-2xl m-60">
  <h2 className="text-2xl text-white font-bold mb-4">Diagnosis System</h2>

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
    <div>
      <label className="text-white">Lux Condition:</label>
      <select
        value={luxValue}
        onChange={(e) => setLuxValue(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
      >
        <option value="">Select Condition</option>
        <option value="Day">Day (Bright)</option>
        <option value="Night">Night (Dark)</option>
      </select>
    </div>

    <div>
      <label className="text-white">Temperature Condition:</label>
      <select
        value={temperatureValue}
        onChange={(e) => setTemperatureValue(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
      >
        <option value="">Select Condition</option>
        <option value="Low Temp">Low Temperature (Cold)</option>
        <option value="High Temp">High Temperature (Hot)</option>
      </select>
    </div>

    <div>
      <label className="text-white">Raindrop Status:</label>
      <select
        value={raindropStatus}
        onChange={(e) => setRaindropStatus(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
      >
        <option value="">Select Status</option>
        <option value="No Raindrop">No Raindrop</option>
        <option value="Raindrop Detected">Raindrop Detected</option>
      </select>
    </div>

    <div>
      <label className="text-white">Raindrop Value:</label>
      <select
        value={raindropValue}
        onChange={(e) => setRaindropValue(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
      >
        <option value="">Select Value</option>
        <option value="Wet">Wet (&lt; 30,000)</option>
        <option value="Very Dry">Very Dry (&gt; 30,000)</option>
      </select>
    </div>

    <div>
      <label className="text-white">Vibration Status:</label>
      <select
        value={vibrationStatus}
        onChange={(e) => setVibrationStatus(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
      >
        <option value="">Select Status</option>
        <option value="No Vibration">No Vibration</option>
        <option value="Vibration Detected">Vibration Detected</option>
      </select>
    </div>

    <div className="col-span-1 lg:col-span-3 text-center">
      <button
        onClick={handleDiagnose}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Diagnose
      </button>
    </div>
  </div>

  {diagnosisResult && (
    <div className="mt-6 p-4 bg-gray-700 rounded-lg text-white">
      <h3 className="text-lg font-bold">Diagnosis Result:</h3>
      <p>{diagnosisResult}</p>
    </div>
  )}
</div>
</div>
  );
}
