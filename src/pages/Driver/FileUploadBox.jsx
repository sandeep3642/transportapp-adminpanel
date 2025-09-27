import { Upload, X } from "lucide-react";
import Icon from "../../assets/icon.png";
const FileUploadBox = ({
  label,
  fileType,
  required = false,
  handleFileUpload,
  uploadedFiles,
}) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
    <div className="flex flex-col items-center">
      <img src={Icon} alt="" className="h-15 w-15 text-blue-500 mb-2" />
      <p className="text-sm text-gray-600 mb-1">
        Drag & Drop Or Upload {label}
      </p>
      <p className="text-xs text-gray-400">(PDF, JPG, PNG)</p>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        id={fileType}
        onChange={(e) => handleFileUpload(fileType, e.target.files[0])}
      />
      <label htmlFor={fileType} className="mt-2 cursor-pointer">
        <span className="text-blue-500 hover:text-blue-600">Choose File</span>
      </label>
      {uploadedFiles?.[fileType] && (
        <p className="text-xs text-green-600 mt-1">
          {uploadedFiles[fileType].name}
        </p>
      )}
    </div>
  </div>
);
export default FileUploadBox;
