import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const customers = [
    {
      id: "CU001",
      name: "Ravi Sharma",
      email: "ravi.sharma@gmail.com",
      mobileNo: "98765 43210",
      joinedOn: "Jan 10, 2023",
      lastLogin: "Oct 02, 2025, 09:20 AM",
      status: "Active",
    },
    {
      id: "CU002",
      name: "Anita Verma",
      email: "anita.verma@gmail.com",
      mobileNo: "99887 66554",
      joinedOn: "Feb 22, 2023",
      lastLogin: "Oct 03, 2025, 10:00 AM",
      status: "Active",
    },
    {
      id: "CU003",
      name: "Manoj Singh",
      email: "manoj.singh@gmail.com",
      mobileNo: "97654 22110",
      joinedOn: "Mar 15, 2023",
      lastLogin: "Sep 29, 2025, 04:30 PM",
      status: "Inactive",
    },
    {
      id: "CU004",
      name: "Priya Patel",
      email: "priya.patel@gmail.com",
      mobileNo: "91234 55678",
      joinedOn: "Apr 09, 2023",
      lastLogin: "Oct 04, 2025, 11:15 AM",
      status: "Active",
    },
    {
      id: "CU005",
      name: "Amit Joshi",
      email: "amit.joshi@gmail.com",
      mobileNo: "99765 71210",
      joinedOn: "May 20, 2023",
      lastLogin: "Sep 30, 2025, 08:50 PM",
      status: "Active",
    },
  ];

  const toggleDropdown = (customerId) => {
    setOpenDropdown(openDropdown === customerId ? null : customerId);
  };

  const handleAction = (action, customer) => {
    console.log(`${action} clicked for customer:`, customer);
    setOpenDropdown(null);
    // Add your action logic here
    navigate("/customer-view")
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
    if (status === "Active") {
      return (
        <span className="  text-[#03A416] text-sm font-medium ">Active</span>
      );
    } else if (status === "Inactive") {
      return (
        <span className="  text-[#FFCC00] text-sm font-medium ">Inactive</span>
      );
    }
  };

  return (
    <>
      <div className="flex justify-end"></div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 my-4">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Customers List
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
                  Joined On
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
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {customer.id}
                  </td>
                  <td className="p-4 text-sm text-gray-900">{customer.name}</td>
                  <td className="p-4 text-sm text-blue-600">
                    {customer.email}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {customer.mobileNo}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {customer.joinedOn}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {customer.lastLogin}
                  </td>
                  <td className="p-4">{getStatusBadge(customer.status)}</td>
                  <td
                    className="p-4 relative"
                    ref={openDropdown === customer.id ? dropdownRef : null}
                  >
                    <button
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={() => toggleDropdown(customer.id)}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openDropdown === customer.id && (
                      <div className="absolute right-0 top-8 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction("view", customer)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                          {/* <button
                            onClick={() => handleAction("edit", customer)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button> */}
                          <button
                            onClick={() => handleAction("delete", customer)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
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

export default CustomerTable;
