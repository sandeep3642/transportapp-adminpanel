import React from "react";
import FileUploadBox from "./FileUploadBox";

const BankDetails = ({ formData, handleInputChange,handleFileUpload }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Bank Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Enter account number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Re-enter your account number
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="reenterAccountNumber"
            value={formData.reenterAccountNumber}
            onChange={handleInputChange}
            placeholder="Re-enter account number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IFSC Code<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            placeholder="Enter ifsc code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Holder Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            placeholder="Enter account holder name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type<span className="text-red-500">*</span>
          </label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select account type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cross Check<span className="text-red-500">*</span>
          </label>
          <FileUploadBox
            label="Cross Check JPG, PNG)"
            fileType="crossCheck"
            required
            handleFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
