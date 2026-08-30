import { DEMO_MODE, SUPABASE_URL } from "../../lib/constants";

const STORAGE_KEY = "unionhub-user";

const normalizeUser = (user = null) => {
  if (!user) return null;

  const email = String(user.email || "demo@college.local");
  const role = user.role || "student";
  const name = user.name || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());
  const initials = (user.initials || name).split(" ").slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("") || "U";

  return {
    id: user.id || "demo-user",
    email,
    role,
    name,
    initials,
  };
};

export const authService = {
  getCurrentUserSync() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return null;
      }

      return normalizeUser(JSON.parse(saved));
    } catch {
      return null;
    }
  },

  async login(email = "demo@college.local", password = "") {
    const normalizedEmail = String(email || "demo@college.local").trim() || "demo@college.local";
    const role = normalizedEmail.toLowerCase().includes("admin") ? "admin" : normalizedEmail.toLowerCase().includes("maintainer") ? "maintainer" : "student";
    const user = normalizeUser({
      id: `demo-${Date.now()}`,
      email: normalizedEmail,
      role,
      name: role === "admin" ? "Super Admin" : role === "maintainer" ? "Academic Maintainer" : "Aswin P.",
      initials: role === "admin" ? "SA" : role === "maintainer" ? "AM" : "AP",
    });

    if (DEMO_MODE || !SUPABASE_URL) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return { user, token: "demo-token" };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { user, token: "supabase-token" };
  },

  async logout() {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  },

  async getCurrentUser() {
    return this.getCurrentUserSync();
  },

  onAuthStateChange(listener) {
    const callback = () => listener(this.getCurrentUserSync());
    callback();
    return () => {};
  },
};
