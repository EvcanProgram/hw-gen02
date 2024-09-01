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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Sensor Data History</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">LUX</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Temperature</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Raindrop Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Raindrop Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vibration Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.lux}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.temperature}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.raindrop_status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.raindrop_value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.vibration_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
