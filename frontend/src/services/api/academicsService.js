import { apiRequest } from "./http";
import { DEMO_MODE } from "../../lib/constants";

const DEMO_MATERIALS = [
  {
    id: "mat-001",
    title: "Data Structures Fundamentals",
    description: "Complete notes on arrays, linked lists, and trees",
    subject: "Data Structures",
    semester: 3,
    department: "CSE",
    uploadedBy: "Aswin P.",
    uploadedAt: "2026-08-28",
    type: "notes",
    size: "2.4 MB",
    views: 342,
    downloads: 89,
    likes: 23,
  },
  {
    id: "mat-002",
    title: "DBMS Query Optimization",
    description: "Advanced SQL and query optimization techniques",
    subject: "Database Management",
    semester: 5,
    department: "CSE",
    uploadedBy: "Prof. Sharma",
    uploadedAt: "2026-08-27",
    type: "slides",
    size: "5.1 MB",
    views: 612,
    downloads: 178,
    likes: 47,
  },
  {
    id: "mat-003",
    title: "Operating Systems Practice Problems",
    description: "100+ solved problems with explanations",
    subject: "Operating Systems",
    semester: 4,
    department: "CSE",
    uploadedBy: "Study Group",
    uploadedAt: "2026-08-25",
    type: "problems",
    size: "3.7 MB",
    views: 891,
    downloads: 234,
    likes: 156,
  },
];

const DEMO_DEPARTMENTS = [
  { id: "dept-001", name: "CSE", code: "CSE" },
  { id: "dept-002", name: "ECE", code: "ECE" },
  { id: "dept-003", name: "ME", code: "ME" },
  { id: "dept-004", name: "CE", code: "CE" },
];

export const academicsService = {
  async getDepartments() {
    if (DEMO_MODE) {
      return { ok: true, data: DEMO_DEPARTMENTS };
    }
    return apiRequest("/api/academics/departments", { method: "GET" });
  },

  async getSemesters(departmentId) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: [
          { id: "sem-1", name: "Semester 1", semesterNo: 1 },
          { id: "sem-2", name: "Semester 2", semesterNo: 2 },
          { id: "sem-3", name: "Semester 3", semesterNo: 3 },
          { id: "sem-4", name: "Semester 4", semesterNo: 4 },
          { id: "sem-5", name: "Semester 5", semesterNo: 5 },
          { id: "sem-6", name: "Semester 6", semesterNo: 6 },
        ],
      };
    }
    return apiRequest(`/api/academics/departments/${departmentId}/semesters`, {
      method: "GET",
    });
  },

  async getSubjects(semesterId) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: [
          { id: "subj-1", name: "Data Structures", code: "CS201" },
          { id: "subj-2", name: "Database Management", code: "CS202" },
          { id: "subj-3", name: "Operating Systems", code: "CS203" },
        ],
      };
    }
    return apiRequest(`/api/academics/semesters/${semesterId}/subjects`, {
      method: "GET",
    });
  },

  async getMaterials(filters = {}) {
    if (DEMO_MODE) {
      const filtered = DEMO_MATERIALS.filter((mat) => {
        if (filters.subject && mat.subject !== filters.subject) return false;
        if (filters.semester && mat.semester !== filters.semester) return false;
        if (filters.type && mat.type !== filters.type) return false;
        return true;
      });
      return { ok: true, data: filtered };
    }
    const params = new URLSearchParams(filters).toString();
    return apiRequest(`/api/academics/materials?${params}`, { method: "GET" });
  },

  async uploadMaterial(formData) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: {
          id: `mat-${Date.now()}`,
          title: formData.get("title"),
          uploadedAt: new Date().toISOString().split("T")[0],
          status: "pending-review",
        },
      };
    }
    return apiRequest("/api/academics/materials", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  },

  async getMyUploads() {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: [
          {
            ...DEMO_MATERIALS[0],
            status: "published",
          },
        ],
      };
    }
    return apiRequest("/api/academics/my-uploads", { method: "GET" });
  },

  async downloadMaterial(materialId) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: { url: "#", fileName: "material.pdf" },
      };
    }
    return apiRequest(`/api/academics/materials/${materialId}/download`, {
      method: "GET",
    });
  },

  async reportMaterial(materialId, reason) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: { reported: true, reason },
      };
    }
    return apiRequest(`/api/academics/materials/${materialId}/report`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },
};
