import React, { useState } from "react";
import ProfileImage from "../../assets/profile.png";
import { getStatusBadge } from "../../utilty/globalStatus";
import { formatDate } from "../../utilty/common";
import { getMessageName } from "../../utilty/messageConstant";
import RejectionReasonModal from "../../components/RejectionReasonModal";
import RejectDocumentModal from "../../components/RejectDocumentModal";
import { approveRejectDocument } from "./driver";
import DocumentCard from "../../components/DocumentCard";
import { toast } from "react-toastify";

const RenderProfileInfo = ({ profileData, fetchTechnicianDetailbyId }) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [documentId, setDocumetId] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectedby, setRejectedby] = useState("");
  const [rejectedAt, setRejectedAt] = useState("");

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

  const handleSubmit = async (reason) => {
    console.log("Rejected with reason:", reason, documentId, "documnet ");
    try {
      let payload = {
        action: "reject",
        reason: reason,
      };
      const response = await approveRejectDocument(payload, documentId);

      const { status, details } = response;
      if (status.success) {
        toast.success(status.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      fetchTechnicianDetailbyId(profileData?.profileSummary?._id);
    }
    setShowRejectModal(false);
  };

  const handleApprove = async (id) => {
    try {
      let payload = { action: "approve" };
      const response = await approveRejectDocument(payload, id);

      const { status, details } = response;
      if (status.success) {
        toast.success(status.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      fetchTechnicianDetailbyId(profileData?.profileSummary?._id);
    }
  };

  const handleReject = (id) => {
    setDocumetId(id);
    setShowRejectModal(true);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      {/* Left Column - Profile Summary, ID Proof, Certificate */}
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Summary Card - Responsive */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 w-full">
          <h3 className="text-base sm:text-lg font-semibold border-b border-gray-200 text-[#393939] mb-4">
            Profile Summary
          </h3>

          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative w-full sm:w-auto flex justify-center sm:justify-start">
              <img
                src={
                  profileData?.profileSummary?.profilePictureUrl ?? ProfileImage
                }
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1">
                <span className="text-sm text-[#121212] font-medium">ID:</span>
                <span className="text-sm font-medium text-[#121212] break-all">
                  {profileData?.profileSummary?.id ?? "NA"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1">
                <span className="text-sm text-[#121212] font-medium">
                  Name:
                </span>
                <span className="text-sm font-medium text-[#121212] break-words">
                  {profileData?.profileSummary?.name ?? "NA"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1">
                <span className="text-sm text-[#121212] font-medium">
                  Phone:
                </span>
                <span className="text-sm font-medium text-[#121212]">
                  {profileData?.profileSummary?.phone ?? "NA"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1">
                <span className="text-sm text-[#121212] font-medium">
                  Status:
                </span>
                <span
                  className={`text-sm font-medium ${getStatusBadge(
                    profileData?.profileSummary?.status
                  )}`}
                >
                  {profileData?.profileSummary?.status ?? "NA"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1">
                <span className="text-sm text-[#121212] font-medium">
                  Role:
                </span>
                <span className="text-sm font-medium text-[#121212]">
                  {profileData?.profileSummary?.role ?? "NA"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-[#121212] font-medium">
                  Location:
                </span>
                <span className="text-sm font-medium text-[#121212] break-words">
                  {profileData?.profileSummary?.location ?? "NA"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ID Proof Section - Responsive */}
        {profileData?.idProof && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full">
            <h4 className="text-base sm:text-lg font-medium border-b border-gray-200 text-[#121212] mb-3">
              ID Proof
            </h4>

            <div className="space-y-3">
              {Object.entries(profileData.idProof).map(([key, value]) => {
                const uploadedDate = formatDate(value[0]?.uploadedAt);
                const status = value[0]?.status?.toLowerCase();
                const fileUrl = value[0]?.fileUrl;
                const id = value[0]?._id;
                const reason = value[0]?.rejectedReason;
                const reviewedBy = value[0]?.reviewedBy;
                const reviewedAt = formatDate(value[0]?.reviewedAt);

                return (
                  <DocumentCard
                    key={key}
                    title={getMessageName(key)}
                    name="Id Proof"
                    fileUrl={fileUrl}
                    uploadedDate={uploadedDate}
                    status={status}
                    onApprove={() => handleApprove(id)}
                    onReject={() => handleReject(id)}
                    showReason={() =>
                      showRejectionReasonModal(reason, reviewedBy, reviewedAt)
                    }
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Selfie Section - Responsive */}
        {profileData?.selfies?.length > 0 && (
          <div className="w-full">
            {profileData.selfies.map((selfie) => (
              <DocumentCard
                key={selfie._id}
                title="Selfie Verification"
                name="Selfie Image"
                fileUrl={selfie.fileUrl}
                uploadedDate={formatDate(selfie.uploadedAt)}
                status={selfie.status?.toLowerCase()}
                onApprove={() => handleApprove(selfie._id)}
                onReject={() => handleReject(selfie._id)}
                showReason={() =>
                  showRejectionReasonModal(
                    selfie.rejectedReason,
                    selfie.reviewedBy,
                    selfie.reviewedAt
                  )
                }
              />
            ))}
          </div>
        )}


        {/* Police Verification Section - Responsive */}
        {profileData?.policeVerifications?.length > 0 && (
          <div className="w-full">
            {profileData.policeVerifications.map((doc) => (
              <DocumentCard
                key={doc._id}
                title="Police Verification"
                name="Verification Document"
                fileUrl={doc.fileUrl}
                uploadedDate={formatDate(doc.uploadedAt)}
                status={doc.status?.toLowerCase()}
                onApprove={() => handleApprove(doc._id)}
                onReject={() => handleReject(doc._id)}
                showReason={() =>
                  showRejectionReasonModal(
                    doc?.rejectedReason,
                    doc?.reviewedBy,
                    doc?.reviewedAt
                  )
                }
              />
            ))}
          </div>
        )}

      </div>

      {/* Right Column - Contact Information, Skills & Expertise */}
      <div className="space-y-4 sm:space-y-6">
        {/* Contact Information Card - Responsive */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full">
          <h3 className="text-base sm:text-lg border-b border-gray-200 font-semibold text-[#121212] mb-4 sm:mb-6">
            Contact Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <span className="text-sm text-[#121212] font-medium">Phone:</span>
              <span className="text-sm font-medium text-[#121212]">
                {profileData?.profileSummary?.phone ?? "NA"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <span className="text-sm text-[#121212] font-medium">
                Alternate Contact:
              </span>
              <span className="text-sm font-medium text-[#121212]">
                {profileData?.contactInformation?.alternateContact ?? "NA"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <span className="text-sm text-[#121212] font-medium">
                Address:
              </span>
              <span className="text-sm font-medium text-[#121212] text-right break-words">
                {profileData?.contactInformation?.address ?? "NA"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-[#121212] font-medium">Email:</span>
              <span className="text-sm font-medium text-[#121212] break-all text-right">
                {profileData?.contactInformation?.email ?? "NA"}
              </span>
            </div>
          </div>
        </div>

        {/* Skills & Expertise Card - Responsive */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full">
          <h4 className="text-base sm:text-lg border-b border-gray-200 font-semibold text-[#121212] mb-4">
            Skills & Expertise
          </h4>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {profileData?.skillsAndExpertise?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              )) || (
                  <span className="text-sm text-[#121212]">No skills listed</span>
                )}
            </div>
          </div>
        </div>

        {/* Certificate Section - Responsive */}
        {profileData?.certificates?.length > 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full">
            <h4 className="text-base sm:text-lg font-medium border-b border-gray-200 text-[#121212] mb-3">
              Certificates
            </h4>

            <div className="space-y-3">
              {profileData.certificates.map((cert, index) => {
                const uploadedDate = formatDate(cert?.uploadedAt);
                const status = cert.status?.toLowerCase();
                const fileUrl = cert.fileUrl;
                const certName = cert.name || `Certificate_${index + 1}`;
                const id = cert?._id;
                const reason = cert?.rejectedReason;
                const reviewedBy = cert?.reviewedBy;
                const reviewedAt = formatDate(cert?.reviewedAt);
                return (
                  <DocumentCard
                    key={id}
                    title="Certificates"
                    name={certName}
                    fileUrl={fileUrl}
                    uploadedDate={uploadedDate}
                    status={status}
                    onApprove={() => handleApprove(id)}
                    onReject={() => setShowRejectModal(id)}
                    showReason={() =>
                      showRejectionReasonModal(reason, reviewedBy, reviewedAt)
                    }
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <RejectionReasonModal
        isOpen={showRejectionModal}
        profileData={profileData}
        onClose={handleCloseRejectionReson}
        rejectionReason={rejectionReason}
        rejectedby={rejectedby}
        rejectedAt={rejectedAt}
        name="document"
      />
      <RejectDocumentModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RenderProfileInfo;
