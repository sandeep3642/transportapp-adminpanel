import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import unblockIcon from "../../assets/Unblock.png";
import blockIcon from "../../assets/block.png";
import RejectDocumentModal from "../../components/RejectDocumentModal";
import RejectionReasonModal from "../../components/RejectionReasonModal";
import Loader from "../../utilty/Loader";
import { formatDate } from "../../utilty/common";
import { getMessageName } from "../../utilty/messageConstant";
import EarningSummary from "./EarningSummary";
import RenderPerformanceMetrics from "./RenderPerformanceMetrics";
import RenderProfileInfo from "./RenderProfileInfo";
import RenderServiceHistory from "./RenderServiceHistory";
import {
  approveRejectProfile,
  blockUnblock,
  fetchDriverDetail,
  fetchDriverEarningDetail,
  driverStats,
} from "./driver";

const DriverView = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Profile Info");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("Driver Details");
  const tabs = [
    "Profile Info",
    "Service History",
    "Ratings & Reviews",
    "Earning Summary",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [statsData, setStatsData] = useState(null);

  const navigate = useNavigate();
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectedby, setRejectedby] = useState("");
  const [rejectedAt, setRejectedAt] = useState("");
  const [DriverEarningSummary, setDriverEarningSummary] =
    useState(null);

  const [isCommissionModalOpen, setIsComissionModalOpen] = useState(false);
  const [currentCommission, setCurrentCommission] = useState("30");

  const handleOpenModal = () => {
    setIsComissionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsComissionModalOpen(false);
  };

  const handleSaveCommission = (newCommission) => {
    setCurrentCommission(newCommission);
    console.log("Commission updated to:", newCommission);
    // Here you would typically make an API call to save the data
  };

  const handleDelete = () => {
    setIsModalOpen(true);
    console.log("Hello");
  };

  const handleDeleteConfirm = () => {
    console.log("Customer deleted!");
    // Add your delete logic here
    setIsModalOpen(false);
  };

  function showRejectionReasonModal(reason, reviewedBy, reviewedAt) {
    setShowRejectionModal(true);
    setRejectionReason(reason);
    setRejectedby(reviewedBy);
    setRejectedAt(reviewedAt);
  }

  function handleCloseRejectionReson() {
    setShowRejectionModal(false);
    setRejectionReason("");
  }
  const handleClick = async (key = "block") => {
    try {
      setIsLoading(true);
      const payload = { action: key };
      const response = await blockUnblock(payload, location.state); // Pass Driver ID

      const { status, details } = response;
      if (status.success && details) {
        toast.success(status.message);
        fetchDriverDetailbyId(location.state); // Refresh Driver data after action
      }
    } catch (error) {
      console.error("Block/Unblock error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchDriverDetailbyId(id) {
    try {
      setIsLoading(true);
      const response = await fetchDriverDetail(id);

      const { status, details } = response;

      if (status.success && details) {
        toast.success(status.message);
        setProfileData(details);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDriverStats(id) {
    try {
      setIsLoading(true);
      const response = await driverStats(id);

      const { status, details } = response;

      if (status.success && details) {
        toast.success(status.message);
        setStatsData(details);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      const payload = { action: "approve" };
      const res = await approveRejectProfile(payload, location.state);
      if (res.status.success) {
        toast.success(res.status.message);
        fetchDriverDetailbyId(location.state);
      }
    } catch (err) {
      toast.error("Approval failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectConfirm = async (reason) => {
    if (!reason.trim()) {
      return toast.error("Please provide a rejection reason.");
    }

    try {
      setIsLoading(true);
      const payload = { action: "reject", reason: reason };
      const res = await approveRejectProfile(payload, location.state);
      if (res.status.success) {
        toast.success(res.status.message);
        fetchDriverDetailbyId(location.state);
      }
      setShowRejectModal(false);
    } catch (err) {
      toast.error("Rejection failed");
    } finally {
      setIsLoading(false);
      fetchDriverDetailbyId(location.state); // Refresh Driver data after action
    }
  };

  async function getDriverEarnings(id) {
    try {
      const response = await fetchDriverEarningDetail(id, "last30Days");

      const { data, status } = response;

      if (status.success && data) {
        setDriverEarningSummary(data);
      }
    } catch (error) {
      toast.error("Failed to fetch Driver earnings");
    }
  }

  useEffect(() => {
    if (location && location.state) {
      fetchDriverDetailbyId(location.state);
      fetchDriverStats(location.state);
      getDriverEarnings(location.state);
    }
  }, [location]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen px-2 sm:px-4 lg:px-6">
      <div className="mx-auto py-4 sm:py-6">
        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-semibold text-[#121212] break-words">
            {activeTab === "Profile Info" && "Driver Details"}
            {activeTab === "Service History" && "Service History"}
            {activeTab === "Performance Metrics" && "Performance Metrics"}
            {activeTab === "Earning Summary" && "Earning Summary"}
          </h1>
        </div>

        {/* Tabs - Mobile Responsive */}
        <div className="border-b border-gray-200 mb-4 sm:mb-6">
          <nav className="flex flex-col sm:flex-row sm:justify-between w-full space-y-3 sm:space-y-0">
            {/* Tab Navigation - Horizontal scroll on mobile */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`bg-[#DDDDDD80] min-w-[150px] cursor-pointer rounded py-2 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${activeTab === tab
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Action Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {activeTab === "Profile Info"
                ? (() => {
                  const reviewStatus =
                    profileData?.profileSummary?.profileReview?.status;
                  const isActive = profileData?.profileSummary?.isActive;
                  const reason =
                    profileData?.profileSummary?.profileReview
                      ?.rejectedReason;
                  const reviewedBy =
                    profileData?.profileSummary?.profileReview?.reviewedBy;
                  const reviewedAt = formatDate(
                    profileData?.profileSummary?.profileReview?.reviewedAt
                  );
                  console.log("reviewedAt", reviewedAt);
                  {
                    if (["SUBMITTED", "UNDER_REVIEW"].includes(reviewStatus))
                      return (
                        <div className="flex flex-row flex-wrap gap-2 sm:gap-4">
                          <p className="text-black  px-3 sm:px-4 py-2 rounded text-sm sm:text-base">
                            {getMessageName(reviewStatus)}
                          </p>
                          <button
                            onClick={handleApprove}
                            className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setShowRejectModal(true)}
                            className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base"
                          >
                            Reject
                          </button>
                        </div>
                      );
                  }

                  {
                    if (reviewStatus === "REJECTED")
                      return (
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          <p className="text-red-500 font-medium text-sm sm:text-base">
                            Rejected
                          </p>
                          <button
                            onClick={() =>
                              showRejectionReasonModal(
                                reason,
                                reviewedBy,
                                reviewedAt
                              )
                            }
                            className="text-blue-600 underline text-sm sm:text-base hover:text-blue-800"
                          >
                            See Why?
                          </button>
                        </div>
                      );
                  }

                  if (reviewStatus === "APPROVED") {
                    return (
                      <button
                        className="flex items-center justify-center p-1"
                        onClick={() =>
                          handleClick(isActive ? "block" : "unblock")
                        }
                      >
                        <img
                          src={isActive ? blockIcon : unblockIcon}
                          className="w-16 sm:w-20 h-5 sm:h-6"
                          alt={isActive ? "Block" : "Unblock"}
                        />
                      </button>
                    );
                  }

                  return null;
                })()
                : activeTab === "Earning Summary" && (
                 <>
                 </>
                )}
            </div>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "Profile Info" && (
          <RenderProfileInfo
            profileData={profileData}
            fetchDriverDetailbyId={fetchDriverDetailbyId}
          />
        )}
        {activeTab === "Service History" && (
          <RenderServiceHistory statsData={statsData} id={location?.state} />
        )}
        {activeTab === "Ratings & Reviews" && <RenderPerformanceMetrics />}

        {activeTab === "Earning Summary" && (
          <EarningSummary
            DriverEarningSummary={DriverEarningSummary}
            handleOpenModal={handleOpenModal}
          />
        )}
      </div>

      {/* Rejection Modal - Responsive */}
      <RejectionReasonModal
        isOpen={showRejectionModal}
        profileData={profileData}
        onClose={handleCloseRejectionReson}
        rejectionReason={rejectionReason}
        rejectedby={rejectedby}
        rejectedAt={rejectedAt}
        name="Driver"
      />
      <RejectDocumentModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onSubmit={handleRejectConfirm}
      />

    </div>
  );
};

export default DriverView;
