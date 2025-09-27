import React from "react";

const PersonalDetails = ({
  formData,
  handleFileUpload,
  handleInputChange,
  handleLanguageChange,
  handleAvailabilityChange,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Personal Details
      </h2>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo<span className="text-red-500">*</span>
          </label>
          <div className="w-20 h-20 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profilePhoto"
              onChange={(e) =>
                handleFileUpload("profilePhoto", e.target.files[0])
              }
            />
            <label htmlFor="profilePhoto" className="cursor-pointer">
              <span className="text-2xl text-gray-400">+</span>
            </label>
          </div>
        </div>

        {/* Availability Status (Checkboxes) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Status<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availabilityStatus"
                value="active"
                checked={formData.availabilityStatus.includes("active")}
                onChange={() => handleAvailabilityChange("active")}
                className="mr-2"
              />
              Active
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availabilityStatus"
                value="inactive"
                checked={formData.availabilityStatus.includes("inactive")}
                onChange={() => handleAvailabilityChange("inactive")}
                className="mr-2"
              />
              Inactive
            </label>
          </div>
        </div>

        {/* Work Type (Radio) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Type<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="workType"
                value="fullTime"
                checked={formData.workType === "fullTime"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Full Time
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="workType"
                value="partTime"
                checked={formData.workType === "partTime"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Part Time
            </label>
          </div>
        </div>

        {/* Commission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commission (%)<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleInputChange}
              className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="ml-2 text-sm text-gray-500">
              (on every service booking)
            </span>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fullname<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender<span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages<span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="hindi"
                  checked={formData.languages.includes("hindi")}
                  onChange={() => handleLanguageChange("hindi")}
                  className="mr-2"
                />
                Hindi
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="english"
                  checked={formData.languages.includes("english")}
                  onChange={() => handleLanguageChange("english")}
                  className="mr-2"
                />
                English
              </label>
            </div>
          </div>
        </div>

        {/* Email */}
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
