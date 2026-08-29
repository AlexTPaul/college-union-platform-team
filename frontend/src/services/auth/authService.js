import { DEMO_MODE, SUPABASE_URL } from "../../lib/constants";

export const authService = {
  async login(email = "demo@college.local", password = "") {
    if (DEMO_MODE || !SUPABASE_URL) {
      return {
        user: {
          id: "demo-user",
          email,
          role: "student",
        },
        token: "demo-token",
      };
    }

    return { user: { email, role: "student" }, token: "supabase-token" };
  },

  async logout() {
    return true;
  },

  async getCurrentUser() {
    if (DEMO_MODE || !SUPABASE_URL) {
      return {
        id: "demo-user",
        email: "demo@college.local",
        role: "student",
      };
    }

    return null;
  },
};
