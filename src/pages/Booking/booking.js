import api from "../../services/apiService";

export const fetchBookingList = async (page = 1, limit = 10, search = "") => {
  const res = await api.post(`/api/v1/booking/list`, {
    status: search,
    page: page,
    limit: limit,
  });
  return res.data;
};

export const fetchDriverDetail = async (id = "685f9ca00cd9a45b01dc5e4c") => {
  const res = await api.get(`/api/v1/user/Drivers/profileInfo/${id}`);
  return res.data;
};

export const approveRejectDocument = async (
  payload,
  id = "685f9ca00cd9a45b01dc5e4c"
) => {
  const res = await api.post(
    `/api/v1/user/Drivers/documents/${id}/approveReject`,
    payload
  );
  return res.data;
};

export const blockUnblock = async (
  payload,
  id = "685f9ca00cd9a45b01dc5e4c"
) => {
  const res = await api.post(
    `/api/v1/user/Drivers/profile/${id}/blockUnblock`,
    payload
  );
  return res.data;
};

export const approveRejectProfile = async (
  payload,
  id = "685f9ca00cd9a45b01dc5e4c"
) => {
  const res = await api.post(
    `/api/v1/user/Drivers/profile/${id}/approveReject`,
    payload
  );
  return res.data;
};

export const driverStats = async (id) => {
  const res = await api.get(`/api/v1/user/Drivers/stats/${id}`);
  return res.data;
};

export const fetchServiceRequests = async (payload) => {
  const res = await api.post("/api/v1/user/serviceRequests", payload);
  return res.data;
};

export const addDriver = async (payload) => {
  const res = await api.post(`/api/v1/user/Drivers/create`, payload);
  return res.data;
};

export const fetchDriverEarningDetail = async (
  id = "685f9ca00cd9a45b01dc5e4c",
  filter = "last30Days"
) => {
  const res = await api.get(`/api/v1/user/payouts/technician/${id}`);
  return res.data;
};
