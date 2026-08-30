import { apiRequest } from "./http";
import { DEMO_MODE } from "../../lib/constants";

const DEMO_NOTIFICATIONS = [
  {
    id: "notif-001",
    type: "event",
    title: "Tech Symposium Registration Open",
    message: "Registration is now open for the Annual Tech Symposium on Sep 15",
    timestamp: "2026-08-29 2:30 PM",
    read: false,
    actionUrl: "/events",
    icon: "calendar",
  },
  {
    id: "notif-002",
    type: "welfare",
    title: "Merit Scholarship Application Deadline",
    message: "Reminder: Merit Scholarship applications close on Sep 30, 2026",
    timestamp: "2026-08-29 10:15 AM",
    read: false,
    actionUrl: "/welfare",
    icon: "award",
  },
  {
    id: "notif-003",
    type: "academics",
    title: "New Study Materials Available",
    message: "Operating Systems notes have been uploaded to the academics section",
    timestamp: "2026-08-28 4:45 PM",
    read: true,
    actionUrl: "/academics",
    icon: "book",
  },
];

export const notificationsService = {
  async getNotifications(filters = {}) {
    if (DEMO_MODE) {
      const unread = filters.unreadOnly
        ? DEMO_NOTIFICATIONS.filter((n) => !n.read)
        : DEMO_NOTIFICATIONS;
      return { ok: true, data: unread };
    }
    const params = new URLSearchParams(filters).toString();
    return apiRequest(`/api/notifications?${params}`, { method: "GET" });
  },

  async markAsRead(notificationId) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: { id: notificationId, read: true },
      };
    }
    return apiRequest(`/api/notifications/${notificationId}/read`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async markAllAsRead() {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: { markedCount: DEMO_NOTIFICATIONS.filter((n) => !n.read).length },
      };
    }
    return apiRequest("/api/notifications/read-all", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async getNotificationPreferences() {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: {
          emailNotifications: true,
          pushNotifications: true,
          eventNotifications: true,
          welfareNotifications: true,
          academicNotifications: true,
          announcementNotifications: true,
        },
      };
    }
    return apiRequest("/api/notification-preferences", { method: "GET" });
  },

  async updateNotificationPreferences(preferences) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: preferences,
      };
    }
    return apiRequest("/api/notification-preferences", {
      method: "PATCH",
      body: JSON.stringify(preferences),
    });
  },

  async registerDevice(deviceData) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: {
          deviceId: `device-${Date.now()}`,
          registered: true,
        },
      };
    }
    return apiRequest("/api/devices/register", {
      method: "POST",
      body: JSON.stringify(deviceData),
    });
  },

  getUnreadCount() {
    if (DEMO_MODE) {
      return DEMO_NOTIFICATIONS.filter((n) => !n.read).length;
    }
    return 0;
  },

  getNotificationTypes() {
    return [
      { id: "event", label: "Events", icon: "calendar" },
      { id: "welfare", label: "Welfare", icon: "award" },
      { id: "academics", label: "Academics", icon: "book" },
      { id: "grievance", label: "Grievance Updates", icon: "alert" },
      { id: "announcement", label: "Announcements", icon: "megaphone" },
    ];
  },
};
