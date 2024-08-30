"use client";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [lastData, setLastData] = useState([]); // Initialize as empty array
  const [allData, setAllData] = useState([]);

  // Fetch latest data for the bar charts
  async function fetchLastData() {
    try {
      const res = await fetch("/api/lastestData");
      const data = await res.json();

      // Check if data is an array
      if (Array.isArray(data)) {
        setLastData(data);
      } else {
        console.error("Unexpected data format for latest data:", data);
        setLastData([]); // Set to empty array to avoid errors
      }

      console.log("Latest Data:", data);
    } catch (error) {
      console.error("Error fetching latest data:", error);
    }
  }

  // Fetch all data for the line charts
  async function fetchAllData() {
    try {
      const res = await fetch("/api/alldata");
      const data = await res.json();

      // Check if data is an array
      if (Array.isArray(data)) {
        setAllData(data);
      } else {
        console.error("Unexpected data format for all data:", data);
        setAllData([]); // Set to empty array to avoid errors
      }

      console.log("All Data:", data);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  }

  useEffect(() => {
    fetchLastData();
    fetchAllData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white pt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>

      <h1 className="text-xl font-semibold mb-2 text-center">Latest Data</h1>
      <div className="flex justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light bg-gray-800 text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">ID</th>
                  <th scope="col" className="px-6 py-4">LUX</th>
                  <th scope="col" className="px-6 py-4">Temperature</th>
                  <th scope="col" className="px-6 py-4">Raindrop Status</th>
                  <th scope="col" className="px-6 py-4">Raindrop Value</th>
                  <th scope="col" className="px-6 py-4">Vibration Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(lastData) && lastData.map((ldata) => (
                  <tr key={ldata.id} className="border-b border-dark-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{ldata.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{ldata.lux}</td>
                    <td className="whitespace-nowrap px-6 py-4">{ldata.temperature}</td>
                    <td className="whitespace-nowrap px-6 py-4">{ldata.raindrop_status}</td>
                    <td className="whitespace-nowrap px-6 py-4">{ldata.raindrop_value}</td>
                    <td className="whitespace-nowrap px-6 py-4">{ldata.vibration_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
