"use client";
import React, { useEffect, useState } from 'react';
import Hero from '@/components/hero';
import styles from './Dashboard.module.css'; // Import the custom CSS module

export default function Dashboard() {
  const [lastData, setLastData] = useState([]);
  const [allData, setAllData] = useState([]);

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
  }, []);

  return (
    <div className="mt-20">
      <Hero />

      <div className="flex justify-center mt-10">
        <div
          className={`w-full max-w-6xl p-10 rounded-3xl bg-gray-900 border-4 border-transparent shadow-2xl backdrop-blur-lg ${styles.animatedBorder}`}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
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
          </div>
        </div>
      </div>
      <div>
        <h1>Test</h1>
      </div>
    </div>
  );
}
