'use client';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/alldata');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Sensor Data History</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
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
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.lux}</td>
                <td>{item.temperature}</td>
                <td>{item.raindrop_status}</td>
                <td>{item.raindrop_value}</td>
                <td>{item.vibration_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
