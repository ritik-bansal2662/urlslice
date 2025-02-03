import React from "react";
import BackgroundWords from "../BackgoundWords";

const Test = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-900 text-white">
      {/* Background Words Component */}
      <BackgroundWords />

      {/* Form Container */}
      <div className="relative z-10 bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm mb-1">Email</label>
            <input type="email" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm mb-1">Password</label>
            <input type="password" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Test;
