import React from "react";
import FileUploadBox from "./FileUploadBox";

const DocumentDetails = ({ uploadedFiles, handleFileUpload }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Upload Documents
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications <span className="text-gray-400">(Optional)</span>
          </label>
          <FileUploadBox
            label="Any Certificates (PDF, JPG, PNG)"
            fileType="certifications"
            handleFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Card <span className="text-gray-400">(Front Side)</span>
            <span className="text-red-500">*</span>
          </label>
          <FileUploadBox
            label="Aadhar Front Side (PDF, JPG, PNG)"
            fileType="aadharFront"
            required
            handleFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Card <span className="text-gray-400">(Back Side)</span>
            <span className="text-red-500">*</span>
          </label>
          <FileUploadBox
            label="Aadhar Back Side (PDF, JPG, PNG)"
            fileType="aadharBack"
            required
            handleFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driving License <span className="text-gray-400">(Front Side)</span>
            <span className="text-red-500">*</span>
          </label>
          <FileUploadBox
            label="Driving License (PDF, JPG, PNG)"
            fileType="drivingLicenseFront"
            required
            handleFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driving License <span className="text-gray-400">(Back Side)</span>
            <span className="text-red-500">*</span>
          </label>
          <FileUploadBox
            label="Driving License (PDF, JPG, PNG)"
            fileType="drivingLicenseBack"
            required
            handleFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driving RC<span className="text-red-500">*</span>
          </label>
          <FileUploadBox
            label="Driving RC (PDF, JPG, PNG)"
            fileType="drivingRC"
            required
            handleFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
