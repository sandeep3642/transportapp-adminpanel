
export const RequestOverview = ({ booking }) => {
  return (
    <div className="p-6 space-y-8">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Booking ID</p>
          <p className="text-base font-medium text-gray-900">{booking.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Type</p>
          <p className="text-base font-medium text-gray-900">{booking.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Status</p>
          <p className="text-base font-medium text-gray-900">
            {booking.status}
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div>
        <h3 className="text-md font-semibold text-[#5C5C5C] mb-1">
          Customer Info
        </h3>
        <div className="border border-[#E5E7EB] mb-3"></div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Name</p>
            <p className="text-base font-medium text-gray-900">
              {booking.customerName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone Number</p>
            <p className="text-base font-medium text-gray-900">
              {booking.phone}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-base font-medium text-gray-900">
              {booking.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Address</p>
            <p className="text-base font-medium text-gray-900">
              {booking.address}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div>
        <h3 className="text-md font-semibold text-[#5C5C5C] mb-1">
          Booking Details
        </h3>
        <div className="border border-[#E5E7EB] mb-3"></div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Pickup Time</p>
            <p className="text-base font-medium text-gray-900">
              {booking.pickupTime}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Drop Off Time</p>
            <p className="text-base font-medium text-gray-900">
              {booking.dropOffTime}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="text-base font-medium text-gray-900">
              {booking.pickupLocation}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="text-base font-medium text-gray-900">
              {booking.dropOffLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Asset Info */}
      <div>
        <h3 className="text-md font-semibold text-[#5C5C5C] mb-1">
          Asset Info
        </h3>
        <div className="border border-[#E5E7EB] mb-3"></div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Vehicle</p>
            <p className="text-base font-medium text-gray-900">
              {booking.vehicle}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Driver</p>
            <p className="text-base font-medium text-gray-900">
              {booking.driver}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Weight</p>
            <p className="text-base font-medium text-gray-900">
              {booking.weight}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Dimensions</p>
            <p className="text-base font-medium text-gray-900">
              {booking.dimensions}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600 mb-1">Special Notes</p>
            <p className="text-base font-medium text-gray-900">
              {booking.specialNotes}
            </p>
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div>
        <h3 className="text-md font-semibold text-[#5C5C5C] mb-1">
          Billing Summary
        </h3>
        <div className="border border-[#E5E7EB] mb-3"></div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Service Fee Paid</p>
            <p className="text-base font-medium text-gray-900">
              {booking.serviceFee}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Base Fee</p>
            <p className="text-base font-medium text-gray-900">
              {booking.baseFee}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Additional Charges</p>
            <p className="text-base font-medium text-gray-900">
              {booking.additionalCharges}{" "}
              <span className="text-gray-500 text-sm">(Waiting)</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Payment Mode</p>
            <p className="text-base font-medium text-gray-900">
              {booking.paymentMode}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Reference No.</p>
            <p className="text-base font-medium text-gray-900">
              {booking.referenceNo}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Payment Date & Time</p>
            <p className="text-base font-medium text-gray-900">
              {booking.paymentDateTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
