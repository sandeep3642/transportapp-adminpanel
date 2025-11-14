import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlobalPagination from "../../components/GlobalPagination";
import { fetchBookingList } from "./booking";

const Booking = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const bookings = [
    {
      id: "BK-2025-0005",
      type: "Truck",
      startLocation: "Mumbai, India",
      endLocation: "Pune, India",
      dateTime: "Sept 24 2025, 10:15",
      status: "Pending",
    },
    {
      id: "BK-2025-0004",
      type: "Truck",
      startLocation: "Kolkata, India",
      endLocation: "Mumbai, India",
      dateTime: "Sept 18 2025, 10:15",
      status: "Completed",
    },
    {
      id: "BK-2025-0003",
      type: "Truck",
      startLocation: "Bangalore, India",
      endLocation: "Panjab, India",
      dateTime: "Sept 12 2025, 10:15",
      status: "In Transit",
    },
    {
      id: "BK-2025-0002",
      type: "Crane",
      startLocation: "Mumbai, India",
      endLocation: "-",
      dateTime: "Sept 11 2025, 10:15",
      status: "In Transit",
    },
    {
      id: "BK-2025-0001",
      type: "Crane",
      startLocation: "Pune, India",
      endLocation: "-",
      dateTime: "Sept 09 2025, 10:15",
      status: "Completed",
    },
  ];

  const handleCheckboxChange = (bookingId) => {
    setSelectedBookings((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === bookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(bookings.map((booking) => booking.id));
    }
  };

  const toggleDropdown = (bookingId) => {
    setOpenDropdown(openDropdown === bookingId ? null : bookingId);
  };

  const handleAction = (action, booking) => {
    if (action === "view" || action === "edit") {
      navigate(`/booking-details/${booking.id}`);
    }
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return (
        <span className="text-[#FFCC00] text-sm font-medium">Pending</span>
      );
    } else if (status === "Completed") {
      return (
        <span className="text-[#03A416] text-sm font-medium">Completed</span>
      );
    } else if (status === "In Transit") {
      return (
        <span className="text-[#FF8C00] text-sm font-medium">In Transit</span>
      );
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.endLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function getBookingData() {
    const response = await fetchBookingList(1,10,searchTerm)
    console.log("response",response)

  }

  useEffect(() => {

    getBookingData()

  }, []);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
          onClick={() => navigate("/booking-create")}
        >
          <Plus className="w-4 h-4" />
          Add Booking
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 my-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Booking Request List
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F3F4F6]">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === bookings.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  Booking ID
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Type & asset
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  Start Location
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  End Location
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Date & Time
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleCheckboxChange(booking.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4 text-sm text-gray-900 font-medium">
                    {booking.id}
                  </td>
                  <td className="p-4 text-sm text-gray-900">{booking.type}</td>
                  <td className="p-4 text-sm text-gray-900">
                    {booking.startLocation}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {booking.endLocation}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {booking.dateTime}
                  </td>
                  <td className="p-4">{getStatusBadge(booking.status)}</td>
                  <td
                    className="p-4 relative"
                    ref={openDropdown === booking.id ? dropdownRef : null}
                  >
                    <button
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={() => toggleDropdown(booking.id)}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openDropdown === booking.id && (
                      <div className="absolute right-0 top-8 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction("view", booking)}
                            className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleAction("edit", booking)}
                            className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleAction("delete", booking)}
                            className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 md:px-0">
            {/* <GlobalPagination
              currentPage={servicesPagination.currentPage}
              totalPages={Math.ceil(
                servicesPagination.totalItems / servicesPagination.rowsPerPage
              )}
              onPageChange={(page) =>
                setServicesPagination((prev) => ({
                  ...prev,
                  currentPage: page,
                }))
              }
              rowsPerPage={servicesPagination.rowsPerPage}
              onRowsPerPageChange={(value) => {
                setServicesPagination((prev) => ({
                  ...prev,
                  rowsPerPage: value,
                  currentPage: 1,
                }));
              }}
            /> */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
