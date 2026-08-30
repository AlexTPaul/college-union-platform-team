import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { authService } from "./services/auth/authService";

const defaultUser = {
  id: "demo-user",
  email: "demo@college.local",
  role: "student",
  name: "Aswin P.",
  initials: "AP",
};

export default function App() {
  const [user, setUser] = useState(() => authService.getCurrentUserSync() || defaultUser);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((nextUser) => {
      if (nextUser) {
        setUser(nextUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (nextUser) => {
    const safeUser = nextUser || defaultUser;
    setUser(safeUser);
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateRole = (nextRole) => {
    setUser((current) => (current ? { ...current, role: nextRole } : { ...defaultUser, role: nextRole }));
  };

  return (
    <BrowserRouter>
      <AppRoutes
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        setRole={updateRole}
      />
    </BrowserRouter>
  );
}
