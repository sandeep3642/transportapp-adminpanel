import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import OtherDetails from "./OtherDetails";
import VehicleDetails from "./VehicleDetails";
import BankDetails from "./BankDetails";
import DocumentDetails from "./DocumentDetails";

export default function DriverRegistration() {
  const [formData, setFormData] = useState({
    accountNumber: "",
    reenterAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    accountType: "",
    fullName: "",
    gender: "male",
    email: "",
    mobile: "",
    availabilityStatus: "active",
    workType: "fullTime",
    commission: "30",
    languages: [],
    city: "",
    yearOfExperience: "",
    vehicleType: "",
    vehicleCategory: "",
    registrationNo: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    crossCheck: null,
    certifications: null,
    aadharFront: null,
    aadharBack: null,
    drivingLicenseFront: null,
    drivingLicenseBack: null,
    drivingRC: null,
    profilePhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleFileUpload = (fileType, file) => {
    setUploadedFiles((prev) => ({ ...prev, [fileType]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Uploaded Files:", uploadedFiles);
    // Handle form submission
  };

  const handleCancel = () => {
    setFormData({
      accountNumber: "",
      reenterAccountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      accountType: "",
      fullName: "",
      gender: "male",
      email: "",
      mobile: "",
      availabilityStatus: "active",
      workType: "fullTime",
      commission: "30",
      languages: [],
      city: "",
      yearOfExperience: "",
      vehicleType: "",
      vehicleCategory: "",
      registrationNo: "",
    });
    setUploadedFiles({
      crossCheck: null,
      certifications: null,
      aadharFront: null,
      aadharBack: null,
      drivingLicenseFront: null,
      drivingLicenseBack: null,
      drivingRC: null,
      profilePhoto: null,
    });
  };

  return (
    <div className="mx-auto p-6 ">
      <div className="space-y-8 p-6">
        {/* Personal Details Section */}
        <PersonalDetails
          formData={formData}
          handleFileUpload={handleFileUpload}
          handleInputChange={handleInputChange}
          handleLanguageChange={handleLanguageChange}
        />

        {/* Other Details Section */}
        <OtherDetails
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Vehicle Details Section */}
        <VehicleDetails
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Bank Details Section */}
        <BankDetails
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
        />

        {/* Upload Documents Section */}
        <DocumentDetails
          uploadedFiles={uploadedFiles}
          handleFileUpload={handleFileUpload}
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#E86A2B] text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
