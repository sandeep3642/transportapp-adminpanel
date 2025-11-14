import React, { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingIcon from "../../assets/pic1.png";
import DriverIcon from "../../assets/pic2.png";
import { RequestOverview } from "./RequestOverview";
import { StatusUpdate } from "./StatusUpdate";
import { ServiceActivity } from "./ServiceActivity";

const activities = [
  {
    icon: BookingIcon,
    title: "Booking created",
    subtitle: "Customer name: Sangit Sable",
    timestamp: "17 Sept 2025 – 10:00 AM",
  },
  {
    icon: DriverIcon,
    title: "Assigned to Tata Truck XL",
    subtitle: "Driver name: Rajesh Kumar",
    timestamp: "18 Sept 2025 – 09:10 AM",
  },
  {
    icon: DriverIcon,
    title: "Driver en route",
    subtitle: "",
    timestamp: "18 Sept 2025 – 09:40 AM",
  },
  {
    icon: DriverIcon,
    title: "Booking marked as Completed",
    subtitle: "",
    timestamp: "18 Sept 2025 – 12:00 AM",
  },
];

// Main Booking Details Page
const BookingDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Sample booking data
  const booking = {
    id: "#BK-2025-0004",
    type: "Truck",
    status: "Pending",
    customerName: "Sangit Sable",
    phone: "+91 75422 85214",
    email: "sangit@gmail.com",
    address: "123, Green Street, Kolkata, KT – 560001",
    pickupTime: "Sept 18, 2025, 10:15 AM",
    dropOffTime: "Sept 18, 2025, 12:00 AM",
    pickupLocation: "123, Green Street, Kolkata, KT – 560001",
    dropOffLocation: "123, Green Street, Mumbai, MH - 560006",
    vehicle: "Tata Truck XL, Capacity: 12 Tons",
    driver: "Rajesh Kumar (+91 98xxxxxx)",
    weight: "9.5 Tons",
    dimensions: "18ft x 7ft x 6ft",
    specialNotes: "Fragile goods, handle with care",
    serviceFee: "₹26,200",
    baseFee: "₹25,000",
    additionalCharges: "₹1200",
    paymentMode: "Online",
    referenceNo: "TXN# 45928173",
    paymentDateTime: "Apr 18, 2025 at 4:35 PM",
  };

  const availableDrivers = [
    { id: "DR12345", name: "Sangit S.", availability: "Available", rating: 4 },
    { id: "DR21426", name: "Mangesh T.", availability: "Available", rating: 4 },
    { id: "DR65828", name: "Sajit A.", availability: "Available", rating: 4 },
    { id: "DR12555", name: "Santosh S.", availability: "Available", rating: 4 },
  ];

  const tabs = [
    { id: "overview", label: "Request Overview" },
    { id: "status", label: "Status Update" },
    { id: "activity", label: "Service Activity" },
  ];

  const filteredDrivers = availableDrivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDriverToggle = (driverId) => {
    setSelectedDrivers((prev) =>
      prev.includes(driverId)
        ? prev.filter((id) => id !== driverId)
        : [...prev, driverId]
    );
  };

  const handleAllocate = () => {
    console.log("Allocating drivers:", selectedDrivers);
    alert(`Allocated drivers: ${selectedDrivers.join(", ")}`);
    setIsDriverDialogOpen(false);
    setSelectedDrivers([]);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Details Tab</h1>
        </div>

        {/* Tabs Card */}
        <div>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 text-sm font-medium border-b-2 transition-colors rounded-t-md ${
                    activeTab === tab.id
                      ? "border-orange-500 text-[#E86A2B] bg-[#E86A2B1A]"
                      : "border-transparent text-[#5C5C5C] hover:text-gray-900 bg-[#DDDDDD80]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && <RequestOverview booking={booking} />}
            {activeTab === "status" && <StatusUpdate booking={booking} />}
            {activeTab === "activity" && (
              <ServiceActivity booking={booking} activities={activities} />
            )}
          </div>
        </div>
      </div>

      {isDriverDialogOpen && (
        <div className="fixed inset-0 z-5 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-1 border-[#DDDDDD] rounded-lg w-full max-w-2xl shadow-xl">
            {/* Dialog Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-md font-semibold text-gray-900">
                Select Driver for Allocation
              </h2>
              {/* Search Bar */}
              <div className=" flex ">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or DL number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[300px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Driver List Table */}
            <div className="px-6 pb-4 mt-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-semibold text-gray-700">
                      <th className="px-4 py-3 w-20">Allocate</th>
                      <th className="px-4 py-3">Driver ID</th>
                      <th className="px-4 py-3">Driver</th>
                      <th className="px-4 py-3">Availability</th>
                      <th className="px-4 py-3">Ratings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedDrivers.includes(driver.id)}
                            onChange={() => handleDriverToggle(driver.id)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          #{driver.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {driver.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {driver.availability}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-base ${
                                  i < driver.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Send Notification Button */}
            <div className="px-6 py-6 flex justify-end gap-3">
              <button
                onClick={() => setIsDriverDialogOpen(false)}
                className="px-8 cursor-pointer py-2.5 text-sm font-medium rounded-lg border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedDrivers.length > 0) {
                    handleAllocate();
                  }
                }}
                disabled={selectedDrivers.length === 0}
                className={`px-8 py-2.5 text-sm font-medium rounded-lg transition-colorscursor-pointer  ${
                  selectedDrivers.length > 0
                    ? "bg-[#E86A2B] text-white hover:bg-orange-600 shadow-sm cursor-pointer"
                    : "bg-orange-300 text-white cursor-not-allowed"
                }`}
              >
                Sends a notification
              </button>
            </div>
          </div>
        </div>
      )}
      {booking.status === "Pending" &&
        activeTab ===
          "overview" &&(
            <div className="flex justify-end gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-8 cursor-pointer py-2.5 text-sm font-medium rounded-lg border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDriverDialogOpen(true)}
                className="px-6 py-2 bg-[#E86A2B] text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
              >
                Allocate
              </button>
            </div>
          )}
    </div>
  );
};

export default BookingDetails;
