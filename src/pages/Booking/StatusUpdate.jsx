import { useState } from "react";

export const StatusUpdate = ({ booking }) => {
  const [status, setStatus] = useState("In Progress");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Status:", status, "Comment:", comment);
    // Add your submit logic here
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Change Request Status
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#5C5C5C] mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="In Transit">In Transit</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5C5C5C] mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter update message or note"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};
