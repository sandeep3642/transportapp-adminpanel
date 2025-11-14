import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchDriversList } from "./driver"; // Adjust path as needed

const DriverTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const dropdownRef = useRef(null);

  // Fetch drivers from API
  const loadDrivers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchDriversList(currentPage, limit, searchTerm);
      console.log(response,"response")
      // Assuming the API returns data in format: { data: [...], total, page, limit }
      setDrivers(response.details.drivers || []);
      setTotalPages(Math.ceil((response.details.pagination.total || 0) / limit));
    } catch (err) {
      setError(err.message || "Failed to fetch drivers");
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load drivers on mount and when page/search changes
  useEffect(() => {
    loadDrivers();
  }, [currentPage]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        loadDrivers();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleCheckboxChange = (e, driverId) => {
    e.stopPropagation(); // Prevent row click when clicking checkbox
    setSelectedDrivers((prev) =>
      prev.includes(driverId)
        ? prev.filter((id) => id !== driverId)
        : [...prev, driverId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDrivers.length === drivers.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(drivers.map((driver) => driver.id || driver._id));
    }
  };

  const toggleDropdown = (e, driverId) => {
    e.stopPropagation(); // Prevent row click when clicking dropdown
    setOpenDropdown(openDropdown === driverId ? null : driverId);
  };

  const handleAction = (action, driver) => {
    console.log(`${action} clicked for driver:`, driver);
    setOpenDropdown(null);
    
    if (action === "view") {
      navigate(`/driver-view`, { state: driver.id || driver._id });
    } else if (action === "edit") {
      navigate(`/driver-edit/${driver.id || driver._id}`, { state: driver.id || driver._id });
    } else if (action === "delete") {
      // Add delete logic here
    }
  };

  // Handle row click to navigate to driver view
  const handleRowClick = (driver) => {
      navigate(`/driver-view`, { state: driver.id || driver._id });
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
    if (status === "Available" || status === "available") {
      return (
        <span className="text-[#03A416] text-sm font-medium">Available</span>
      );
    } else if (status === "On Leave" || status === "onLeave") {
      return (
        <span className="text-[#FFCC00] text-sm font-medium">On Leave</span>
      );
    }
    return <span className="text-gray-500 text-sm font-medium">{status}</span>;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
          onClick={() => navigate("/driver-register")}
        >
          <Plus className="w-4 h-4" />
          Add Driver
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 my-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Drivers List</h2>
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

        {/* Loading/Error States */}
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="text-gray-600">Loading drivers...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center p-8">
            <div className="text-red-600">Error: {error}</div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F3F4F6]">
                <tr>
                  <th className="w-12 p-4">
                    <input
                      type="checkbox"
                      checked={selectedDrivers.length === drivers.length && drivers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    ID
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Mobile No.
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Vehicle
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-gray-700">
                    Trips
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-gray-700">
                    Earnings
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Last Login
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
                {drivers.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center p-8 text-gray-500">
                      No drivers found
                    </td>
                  </tr>
                ) : (
                  drivers.map((driver) => (
                    <tr 
                      key={driver.id || driver._id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(driver)}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedDrivers.includes(driver.id || driver._id)}
                          onChange={(e) => handleCheckboxChange(e, driver.id || driver._id)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="p-4 text-sm text-gray-900 font-medium">
                        {driver.id || driver._id}
                      </td>
                      <td className="p-4 text-sm text-gray-900">{driver.name}</td>
                      <td className="p-4 text-sm text-blue-600">{driver.email}</td>
                      <td className="p-4 text-sm text-gray-900">{driver.mobile || driver.phone}</td>
                      <td className="p-4 text-sm text-gray-900">
                        {driver.vehicleCategory || driver.vehicleCategory || "N/A"}
                      </td>
                      <td className="p-4 text-sm text-gray-900 text-center">
                        {driver.trips || 0}
                      </td>
                      <td className="p-4 text-sm text-gray-900 text-center">
                        {driver.earnings || "₹0"}
                      </td>
                      <td className="p-4 text-sm text-gray-900">
                        {driver.lastLogin || "N/A"}
                      </td>
                      <td className="p-4">{getStatusBadge(driver.currentStatus)}</td>
                      <td
                        className="p-4 relative"
                        ref={openDropdown === (driver.id || driver._id) ? dropdownRef : null}
                      >
                        <button
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          onClick={(e) => toggleDropdown(e, driver.id || driver._id)}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openDropdown === (driver.id || driver._id) && (
                          <div className="absolute right-0 top-8 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <div className="py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction("view", driver);
                                }}
                                className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction("edit", driver);
                                }}
                                className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction("delete", driver);
                                }}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer with Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default DriverTable;