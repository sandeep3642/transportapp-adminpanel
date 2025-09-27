import React from "react";

const VehicleDetails = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Vehicle Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type<span className="text-red-500">*</span>
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
            <option value="truck">Truck</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Category<span className="text-red-500">*</span>
          </label>
          <select
            name="vehicleCategory"
            value={formData.vehicleCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Vehicle Category</option>
            <option value="economy">Economy</option>
            <option value="premium">Premium</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration No.<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleInputChange}
            placeholder="Enter Registration No."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
