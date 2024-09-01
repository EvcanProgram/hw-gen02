"use client";
import React, { useEffect, useState } from 'react';
import Hero from '@/components/hero'

export default function Dashboard() {
  const [lastData, setLastData] = useState([]);
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
    
      <div className="mt-20">
        <Hero/>
        <div className="flex justify-leftt ml-10 w-full">
          <div className="w-full max-w-6xl p-10 rounded-3xl bg-black/70 backdrop-blur-lg shadow-2xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
              <div className="rounded-xl p-6 text-center">
                <div className="text-white text-lg font-semibold mb-2">LUX</div>
                {Array.isArray(lastData) && lastData.map((ldata) => (
                  <div key={ldata.id} className="text-white text-2xl font-bold">
                    {ldata.lux}
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6 text-center">
                <div className="text-white text-lg font-semibold mb-2">Temperature</div>
                {Array.isArray(lastData) && lastData.map((ldata) => (
                  <div key={ldata.id} className="text-white text-2xl font-bold">
                    {ldata.temperature}
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6 text-center">
                <div className="text-white text-lg font-semibold mb-2">Raindrop Status</div>
                {Array.isArray(lastData) && lastData.map((ldata) => (
                  <div key={ldata.id} className="text-white text-2xl font-bold">
                    {ldata.raindrop_status}
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6 text-center">
                <div className="text-white text-lg font-semibold mb-2">Raindrop Value</div>
                {Array.isArray(lastData) && lastData.map((ldata) => (
                  <div key={ldata.id} className="text-white text-2xl font-bold">
                    {ldata.raindrop_value}
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6 text-center">
                <div className="text-white text-lg font-semibold mb-2">Vibration Status</div>
                {Array.isArray(lastData) && lastData.map((ldata) => (
                  <div key={ldata.id} className="text-white text-2xl font-bold">
                    {ldata.vibration_status}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}
