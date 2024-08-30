"use client"
export default function LedControl() {

const updateLEDStatus = async (command) => {
    try {
      const response = await fetch('/api/getControlCommand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
  
      const data = await response.json();
  
      console.log('Response Data:', data);
      if (data.success) {
        alert(`Command updated to ${command}`);
      } else {
        alert(`Failed to update Command: ${JSON.stringify(data)}`);
        console.error('Failed to update Command:', data);
      }
    } catch (error) {
      console.error('Error updating Command:', error);
      alert('Error updating Command');
    }
  };
  
    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">LED Control</h1>
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => updateLEDStatus('RED_ON')}
            >
              Red LED
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => updateLEDStatus('YELLOW_ON')}
            >
              Yellow LED
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => updateLEDStatus('GREEN_ON')}
            >
              Green LED
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => updateLEDStatus('OFF')}
            >
              Off
            </button>
          </div>
        </div>
      </div>
    )
}