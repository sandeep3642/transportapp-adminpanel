// src/features/auth/authService.js
import api from "../../services/apiService";

export const fetchTechniciansList = async (page = 1, limit = 10,search="") => {
  const res = await api.get(`/api/v1/user/technicians?page=${page}&limit=${limit}&search=${search}`);
  return res.data;
};

export const fetchTechnicianDetail = async (id) => {
  const res = await api.get(`/api/v1/user/technicians/profileInfo/${id}`);
  return res.data;
};

export const approveRejectDocument = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/technicians/documents/${id}/approveReject`,
    payload
  );
  return res.data;
};

export const blockUnblock = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/technicians/profile/${id}/blockUnblock`,
    payload
  );
  return res.data;
};

export const approveRejectProfile = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/technicians/profile/${id}/approveReject`,
    payload
  );
  return res.data;
};

export const technicianStats = async (id) => {
  const res = await api.get(`/api/v1/user/technicians/stats/${id}`);
  return res.data;
};

export const fetchServiceRequests = async (payload) => {
  const res = await api.post("/api/v1/user/serviceRequests", payload);
  return res.data;
};

export const addTechnician = async (payload) => {
  const res = await api.post(`/api/v1/user/technicians/create`, payload);
  return res.data;
};

export const fetchTechnicianEarningDetail = async (
  id = "685f9ca00cd9a45b01dc5e4c",
  filter = "last30Days"
) => {
  const res = await api.get(`/api/v1/user/payouts/technician/${id}`);
  return res.data;
};

