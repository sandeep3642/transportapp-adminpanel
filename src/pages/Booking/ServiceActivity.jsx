import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
export const ServiceActivity = ({ booking, activities }) => {
  const [note, setNote] = useState("");

  const handleSendNote = () => {
    console.log("Sending note:", note);
    setNote("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Service Activity Log
        </h3>
      </div>

      <div className="flex justify-center">
        <button className="text-orange-500 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 font-medium cursor-pointer">
          Load Previous
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white">
                <img src={activity.icon} alt="" />
              </div>
            </div>
            <div className="flex-1 border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {activity.title}
                  </h4>
                  {activity.subtitle && (
                    <p className="text-sm text-orange-500 mt-1">
                      {activity.subtitle}
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Input */}
      <div className="flex gap-2 pt-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add internal note for admin"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <Paperclip className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleSendNote}
          className="bg-[#1E3A5F] hover:bg-[#152d48] text-white px-4 py-3 rounded-lg cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
