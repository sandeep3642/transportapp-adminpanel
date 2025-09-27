import React from "react";

const OtherDetails = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Other Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City<span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select City</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Experience<span className="text-red-500">*</span>
          </label>
          <select
            name="yearOfExperience"
            value={formData.yearOfExperience}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your experience</option>
            <option value="0-1">0-1 years</option>
            <option value="2-3">2-3 years</option>
            <option value="4-5">4-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
