"use client";
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import styles from './Dashboard.module.css';
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

  // Process data for bar charts
  const chartData1 = lastData.length > 0 ? {
    labels: ['Lux', 'Temperature'],
    datasets: lastData.map((dataPoint, index) => ({
      label: `Data Point ${index + 1}`,
      data: [dataPoint.lux, dataPoint.temperature],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    })),
  } : null;

  const chartData2 = lastData.length > 0 ? {
    labels: ['raindrop_value', 'Distance'],
    datasets: lastData.map((dataPoint, index) => ({
      label: `Data Point ${index + 1}`,
      data: [dataPoint.temp, dataPoint.distance],
      backgroundColor: [
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
    })),
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Latest Sensor Data Visualization',
      },
    },
  };

  useEffect(() => {
    fetchLastData();
    fetchAllData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Dashboard</h1>

      <div className={styles.chartRow}>
        {lastData.length > 0 && chartData1 ? (
          <div className={styles.chartContainer}>
            <h2>LDR and VR</h2>
            <Bar data={chartData1} options={chartOptions} />
          </div>
        ) : (
          <p>No data available for LDR and VR chart</p>
        )}

        {lastData.length > 0 && chartData2 ? (
          <div className={styles.chartContainer}>
            <h2>Temperature and Distance</h2>
            <Bar data={chartData2} options={chartOptions} />
          </div>
        ) : (
          <p>No data available for Temperature and Distance chart</p>
        )}
      </div>


      <h1 className={styles.heading}>Latest Data</h1>
      <table className={`table table-striped table-bordered ${styles.table}`}>
  <thead className="thead-dark">
    <tr>
      <th>ID</th>
      <th>LUX</th>
      <th>Temperature</th>
      <th>raindrop_status</th>
      <th>raindrop_value</th>
      <th>vibration_status</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(lastData) && lastData.map((ldata) => (
      <tr key={ldata.id}>
        <td>{ldata.id}</td>
        <td>{ldata.lux}</td>
        <td>{ldata.temperature}</td>
        <td>{ldata.raindrop_status}</td>
        <td>{ldata.raindrop_value}</td>
        <td>{ldata.vibration_status}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>  
  );
}
