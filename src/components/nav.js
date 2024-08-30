"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from '../../public/logo.png';

// const updateLEDStatus = async (command) => {
//   try {
//     const response = await fetch('/api/getControlCommand', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ command }),
//     });

//     const data = await response.json();

//     console.log('Response Data:', data);
//     if (data.success) {
//       alert(`Command updated to ${command}`);
//     } else {
//       alert(`Failed to update Command: ${JSON.stringify(data)}`);
//       console.error('Failed to update Command:', data);
//     }
//   } catch (error) {
//     console.error('Error updating Command:', error);
//     alert('Error updating Command');
//   }
// };

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div href="./" className="flex items-center">
          <span className="text-white text-lg font-bold">RASBBERY PI PICO DASHBOARD</span>
        </div>
        <div className="hidden lg:flex space-x-4">
          <Link href="./" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full no-underline">HOME</Link>
          <Link href="/History" className="text-gray-400 hover:text-white content-center no-underline">DB HISTORY</Link>
          <Link href="/LedControl" className="text-gray-400 hover:text-white content-center no-underline">LedControl</Link>
          {/* <div className="flex space-x-2">
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              onClick={() => updateLEDStatus('RED_ON')}
            >
              Red Led
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
              onClick={() => updateLEDStatus('YELLOW_ON')}
            >
              Yellow Led
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
              onClick={() => updateLEDStatus('GREEN_ON')}
            >
              Green Led
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => updateLEDStatus('OFF')}
            >
              Off
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
