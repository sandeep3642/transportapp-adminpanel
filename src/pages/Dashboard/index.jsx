import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import EarningIcon from "../../assets/earning1.png";
import JobsIcon from "../../assets/jobs.png";
import TechIcon from "../../assets/tech-online.png";
import UserIcon from "../../assets/user1.png";
import PendingIcon from "../../assets/pending.png";
import CompletedIcon from "../../assets/completed.png";
import CancelIcon from "../../assets/cancel.png";
import ProgressBar from "./Progressbar";
import StatsCard from "../../components/StatsCard";
import ServiceRequestTable from "./ServiceRequestTable";
import TechnicianPerformance from "./TechnicianPerformance";
import { toast } from "react-toastify";
import {
  getCaseResolutionTimeSummary,
  getDashboardSummary,
  getRecentServiceRequestsSummary,
  getRecentTechnicianPerformanceSummary,
  getTechnicianAssigmentTimeSummary,
} from "./DashboardServices";

const getColorByLabel = (label) => {
  switch (label) {
    case "<15 mins":
      return "blue";
    case "15-30 mins":
      return "purple";
    case "30-60 mins":
      return "green";
    case "60-120 mins":
      return "gray";
    case ">120 mins":
      return "red";
    default:
      return "blue";
  }
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [assignmentTimeData, setAssignmentTimeData] = useState([]);
  const [caseResolutionTimeData, setCaseResolutionTimeData] = useState([]);
  const [recentServiceRequestData, setRecentServiceRequestData] = useState([]);
  const [technicianPerformanceData, setTechnicianPerformanceData] = useState(
    []
  );

  const fetchDashboardSummaryData = async () => {
    try {
      const response = await getDashboardSummary();
      const { details, status } = response;
      if (status.success && details) {
        setDashboardData(details);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard summary data");
    }
  };

  const fetchTechnicianAssigmentTimeSummary = async () => {
    try {
      const response = await getTechnicianAssigmentTimeSummary();
      const { details, status } = response;
      if (status.success && details.assignmentTimeDistribution) {
        setAssignmentTimeData(details.assignmentTimeDistribution || []);
      }
    } catch (error) {
      toast.error("Failed to fetch technician time summary");
    }
  };

  const fetchCaseResolutionTimeSummary = async () => {
    try {
      const response = await getCaseResolutionTimeSummary();
      const { details, status } = response;
      if (status.success && details.result) {
        setCaseResolutionTimeData(details.result || []);
      }
    } catch (error) {
      toast.error("Failed to fetch case resolution summary");
    }
  };

  const fetchRecentServiceRequestsSummary = async () => {
    try {
      const response = await getRecentServiceRequestsSummary();
      const { details, status } = response;
      if (status.success && details.recentServiceRequests) {
        setRecentServiceRequestData(details.recentServiceRequests || []);
      }
    } catch (error) {
      toast.error("Failed to fetch service requests summary");
    }
  };

  const fetchRecentTechnicianPerformanceSummary = async () => {
    try {
      const response = await getRecentTechnicianPerformanceSummary();
      const { details, status } = response;
      if (status.success && details.topTechnicians) {
        setTechnicianPerformanceData(details.topTechnicians || []);
      }
    } catch (error) {
      toast.error("Failed to fetch technicians performance summary");
    }
  };

  useEffect(() => {
    fetchDashboardSummaryData();
    fetchTechnicianAssigmentTimeSummary();
    fetchCaseResolutionTimeSummary();
    fetchRecentServiceRequestsSummary();
    fetchRecentTechnicianPerformanceSummary();
  }, []);

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        {/* <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatsCard
          src={UserIcon}
          title="Active Trips"
          value={dashboardData?.serviceRequests?.count ?? "-"}
          change={`+${dashboardData?.serviceRequests?.percentChange ?? 0}%`}
          color="blue"
        />

        <StatsCard
          src={JobsIcon}
          title="Scheduled Bookings"
          value={dashboardData?.ongoingJobs?.count ?? "-"}
          change={`${
            dashboardData?.ongoingJobs?.awaitingTechnician ?? 0
          } awaiting tech`}
          color="green"
        />

        <StatsCard
          src={TechIcon}
          title="Drivers Available"
          value={dashboardData?.techniciansOnline?.count ?? "-"}
          change={`out of ${dashboardData?.techniciansOnline?.total ?? "-"}`}
          color="orange"
        />

        <StatsCard
          src={EarningIcon}
          title="Revenue Today"
          value={`₹${dashboardData?.earningsToday?.amount ?? 0}`}
          change={`+${dashboardData?.earningsToday?.percentChange ?? 0}%`}
          color="purple"
        />
      </div>


      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Driver Performance
          </h3>
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex flex-col min-h-[250px] h-full">
            {assignmentTimeData?.length > 0 ? (
              assignmentTimeData.map((item, index) => (
                <ProgressBar
                  key={index}
                  label={item.label}
                  percentage={item.percent}
                  color={getColorByLabel(item.label)}
                />
              ))
            ) : (
              <span className="text-gray-400 text-sm">No data available</span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Fleet Overview
          </h3>
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex flex-col min-h-[250px] h-full">
            {caseResolutionTimeData?.length > 0 ? (
              caseResolutionTimeData.map((item, index) => (
                <ProgressBar
                  key={index}
                  label={item.label}
                  percentage={item.percent}
                  color={getColorByLabel(item.label)}
                  labelInside={false}
                  height="h-3"
                />
              ))
            ) : (
              <span className="text-gray-400 text-sm">No data available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
