import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DriverTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const drivers = [
    {
      id: "DR001",
      name: "Suresh R.",
      email: "suresh@gmail.com",
      mobile: "98765 43210",
      vehicle: "Ashok Leyland",
      trips: 20,
      earnings: "₹42,500",
      lastLogin: "May 09, 10:15",
      status: "Available",
    },
    {
      id: "DR002",
      name: "Sachin T.",
      email: "sachin@gmail.com",
      mobile: "99887 66554",
      vehicle: "Tata Prima",
      trips: 15,
      earnings: "₹18,900",
      lastLogin: "May 09, 10:30",
      status: "Available",
    },
    {
      id: "DR003",
      name: "Ajit T.",
      email: "ajitt@gmail.com",
      mobile: "97654 22110",
      vehicle: "BharatBenz",
      trips: 8,
      earnings: "₹06,200",
      lastLogin: "May 09, 11:08",
      status: "On Leave",
    },
    {
      id: "DR004",
      name: "Mahesh S.",
      email: "mahesh@gmail.com",
      mobile: "91234 55678",
      vehicle: "ACE FX",
      trips: 11,
      earnings: "₹22,700",
      lastLogin: "May 09, 11:09",
      status: "Available",
    },
    {
      id: "DR005",
      name: "Yogesh P.",
      email: "yogesh@gmail.com",
      mobile: "99765 71210",
      vehicle: "Liebherr LTM",
      trips: 9,
      earnings: "₹10,800",
      lastLogin: "May 09, 13:02",
      status: "Available",
    },
  ];

  const handleCheckboxChange = (driverId) => {
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
      setSelectedDrivers(drivers.map((driver) => driver.id));
    }
  };

  const toggleDropdown = (driverId) => {
    setOpenDropdown(openDropdown === driverId ? null : driverId);
  };

  const handleAction = (action, driver) => {
    console.log(`${action} clicked for driver:`, driver);
    setOpenDropdown(null);
    // Add your action logic here
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
    if (status === "Available") {
      return (
        <span className="  text-[#03A416] text-sm font-medium ">Available</span>
      );
    } else if (status === "On Leave") {
      return (
        <span className="  text-[#FFCC00] text-sm font-medium ">On Leave</span>
      );
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F3F4F6]">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedDrivers.length === drivers.length}
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
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedDrivers.includes(driver.id)}
                      onChange={() => handleCheckboxChange(driver.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4 text-sm text-gray-900 font-medium">
                    {driver.id}
                  </td>
                  <td className="p-4 text-sm text-gray-900">{driver.name}</td>
                  <td className="p-4 text-sm text-blue-600">{driver.email}</td>
                  <td className="p-4 text-sm text-gray-900">{driver.mobile}</td>
                  <td className="p-4 text-sm text-gray-900">
                    {driver.vehicle}
                  </td>
                  <td className="p-4 text-sm text-gray-900 text-center">
                    {driver.trips}
                  </td>
                  <td className="p-4 text-sm text-gray-900 text-center">
                    {driver.earnings}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {driver.lastLogin}
                  </td>
                  <td className="p-4">{getStatusBadge(driver.status)}</td>
                  <td
                    className="p-4 relative"
                    ref={openDropdown === driver.id ? dropdownRef : null}
                  >
                    <button
                      className="text-gray-400 hover:text-gray-600  cursor-pointer"
                      onClick={() => toggleDropdown(driver.id)}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openDropdown === driver.id && (
                      <div className="absolute right-0 top-8 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction("view", driver)}
                            className=" cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleAction("edit", driver)}
                            className=" cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleAction("delete", driver)}
                            className="  cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium  cursor-pointer">
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default DriverTable;
