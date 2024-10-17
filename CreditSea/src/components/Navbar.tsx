import React from 'react';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-200 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold text-green-800">CREDIT APP</h1>
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/" className="text-green-500 font-bold">Home</Link>
          <Link to="/Dashboard" className="text-green-500 font-bold">Dashboard</Link>
          <Link to="/" className="text-green-500 font-bold">Budget</Link>
          <Link to="/" className="text-green-500 font-bold">Card</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
