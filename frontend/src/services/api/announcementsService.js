import { apiRequest } from "./http";
import { DEMO_MODE } from "../../lib/constants";

const DEMO_ANNOUNCEMENTS = [
  {
    id: "ann-001",
    title: "Library extended hours",
    content: "The main library will remain open until 11 PM during exam season",
    category: "library",
    publishedAt: "2026-08-28",
    author: "Library Administration",
    priority: "high",
  },
  {
    id: "ann-002",
    title: "Sports festival registration open",
    content: "Register for the annual sports festival by September 10, 2026",
    category: "sports",
    publishedAt: "2026-08-27",
    author: "Sports Committee",
    priority: "normal",
  },
  {
    id: "ann-003",
    title: "Campus WiFi upgrade",
    content: "WiFi infrastructure will be upgraded on weekends with possible downtime",
    category: "infrastructure",
    publishedAt: "2026-08-25",
    author: "IT Department",
    priority: "normal",
  },
];

export const announcementsService = {
  async getAnnouncements(filters = {}) {
    if (DEMO_MODE) {
      const filtered = DEMO_ANNOUNCEMENTS.filter((ann) => {
        if (filters.category && ann.category !== filters.category) return false;
        if (filters.priority && ann.priority !== filters.priority) return false;
        return true;
      });
      return { ok: true, data: filtered };
    }
    const params = new URLSearchParams(filters).toString();
    return apiRequest(`/api/announcements?${params}`, { method: "GET" });
  },

  async getAnnouncementDetails(announcementId) {
    if (DEMO_MODE) {
      const announcement = DEMO_ANNOUNCEMENTS.find((a) => a.id === announcementId);
      return announcement
        ? {
            ok: true,
            data: {
              ...announcement,
              fullContent: announcement.content + "\n\nFor more information, contact the relevant department.",
              attachments: [],
            },
          }
        : { ok: false, status: 404, data: { error: "Announcement not found" } };
    }
    return apiRequest(`/api/announcements/${announcementId}`, { method: "GET" });
  },

  getCategories() {
    return [
      { id: "general", label: "General" },
      { id: "library", label: "Library" },
      { id: "infrastructure", label: "Infrastructure" },
      { id: "sports", label: "Sports" },
      { id: "academic", label: "Academic" },
    ];
  },

  getPriorities() {
    return [
      { id: "low", label: "Low" },
      { id: "normal", label: "Normal" },
      { id: "high", label: "High" },
      { id: "urgent", label: "Urgent" },
    ];
  },
};
