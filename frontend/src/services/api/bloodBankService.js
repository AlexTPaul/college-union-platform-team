import { apiRequest } from "./http";
import { DEMO_MODE } from "../../lib/constants";

const DEMO_BLOOD_DONORS = [
  {
    id: "donor-001",
    name: "Donor Name",
    bloodGroup: "O+",
    contact: "+91 98765 43210",
    verified: true,
    lastDonation: "2026-05-20",
    campus: true,
  },
  {
    id: "donor-002",
    name: "Another Donor",
    bloodGroup: "A+",
    contact: "+91 87654 32109",
    verified: true,
    lastDonation: "2026-06-15",
    campus: true,
  },
];

const DEMO_BLOOD_REQUESTS = [
  {
    id: "req-001",
    bloodGroup: "B+",
    quantity: "1 unit",
    urgency: "high",
    requester: "Patient Name",
    hospital: "City Medical Center",
    createdAt: "2026-08-29",
    status: "searching",
  },
];

export const bloodBankService = {
  async getDonors(filters = {}) {
    if (DEMO_MODE) {
      const filtered = DEMO_BLOOD_DONORS.filter((donor) => {
        if (filters.bloodGroup && donor.bloodGroup !== filters.bloodGroup) return false;
        if (filters.campus !== undefined && donor.campus !== filters.campus) return false;
        return true;
      });
      return { ok: true, data: filtered };
    }
    const params = new URLSearchParams(filters).toString();
    return apiRequest(`/api/blood-bank/donors?${params}`, { method: "GET" });
  },

  async getRequests() {
    if (DEMO_MODE) {
      return { ok: true, data: DEMO_BLOOD_REQUESTS };
    }
    return apiRequest("/api/blood-bank/requests", { method: "GET" });
  },

  async createRequest(requestData) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: {
          id: `req-${Date.now()}`,
          ...requestData,
          status: "searching",
          createdAt: new Date().toISOString().split("T")[0],
        },
      };
    }
    return apiRequest("/api/blood-bank/requests", {
      method: "POST",
      body: JSON.stringify(requestData),
    });
  },

  async registerAsDonor(donorData) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: {
          id: `donor-${Date.now()}`,
          ...donorData,
          verified: false,
          campus: true,
        },
      };
    }
    return apiRequest("/api/blood-bank/donors/register", {
      method: "POST",
      body: JSON.stringify(donorData),
    });
  },

  getBloodGroups() {
    return ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  },

  getUrgencyLevels() {
    return ["low", "normal", "high", "critical"];
  },
};
