import { apiRequest } from "./http";
import { DEMO_MODE } from "../../lib/constants";

const DEMO_EVENTS = [
  {
    id: "evt-001",
    title: "Annual Tech Symposium",
    description: "Meet industry leaders and explore the latest in technology",
    date: "2026-09-15",
    time: "10:00 AM",
    venue: "Auditorium A",
    category: "symposium",
    attendees: 245,
    registered: false,
    image: "/images/events/tech-symposium.jpg",
  },
  {
    id: "evt-002",
    title: "Football Championship",
    description: "Inter-department football tournament",
    date: "2026-09-10",
    time: "4:00 PM",
    venue: "Sports Ground",
    category: "sports",
    attendees: 180,
    registered: true,
    image: "/images/events/football.jpg",
  },
  {
    id: "evt-003",
    title: "Photography Workshop",
    description: "Learn photography basics from professionals",
    date: "2026-09-20",
    time: "2:00 PM",
    venue: "Studio Lab",
    category: "workshop",
    attendees: 62,
    registered: false,
    image: "/images/events/photography.jpg",
  },
  {
    id: "evt-004",
    title: "Freshers' Welcome Party",
    description: "Welcome event for new students",
    date: "2026-09-05",
    time: "6:00 PM",
    venue: "Main Hall",
    category: "social",
    attendees: 512,
    registered: true,
    image: "/images/events/freshers.jpg",
  },
];

export const eventsService = {
  async getEvents(filters = {}) {
    if (DEMO_MODE) {
      const filtered = DEMO_EVENTS.filter((evt) => {
        if (filters.category && evt.category !== filters.category) return false;
        return true;
      });
      return { ok: true, data: filtered };
    }
    const params = new URLSearchParams(filters).toString();
    return apiRequest(`/api/events?${params}`, { method: "GET" });
  },

  async getEventDetails(eventId) {
    if (DEMO_MODE) {
      const event = DEMO_EVENTS.find((e) => e.id === eventId);
      return event
        ? {
            ok: true,
            data: {
              ...event,
              description: event.description + "\n\nFull details available here.",
              speakers: ["Guest Speaker 1", "Guest Speaker 2"],
              agenda: ["Welcome", "Keynote", "Workshops", "Closing"],
            },
          }
        : { ok: false, status: 404, data: { error: "Event not found" } };
    }
    return apiRequest(`/api/events/${eventId}`, { method: "GET" });
  },

  async registerForEvent(eventId) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: { registered: true, eventId, timestamp: new Date().toISOString() },
      };
    }
    return apiRequest(`/api/events/${eventId}/register`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async unregisterFromEvent(eventId) {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: { unregistered: true, eventId },
      };
    }
    return apiRequest(`/api/events/${eventId}/register`, { method: "DELETE" });
  },

  async getUpcomingEvents() {
    return this.getEvents();
  },

  async getPastEvents() {
    if (DEMO_MODE) {
      return {
        ok: true,
        data: [
          {
            id: "evt-past-001",
            title: "Summer Orientation",
            date: "2026-06-15",
            attendees: 380,
            image: "/images/events/orientation.jpg",
          },
        ],
      };
    }
    return apiRequest("/api/events/past", { method: "GET" });
  },
};
