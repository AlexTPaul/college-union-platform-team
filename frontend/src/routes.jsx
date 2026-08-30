import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/home/pages/HomePage";
import AnnouncementsPage from "./features/announcements/pages/AnnouncementsPage";
import EventsPage from "./features/events/pages/EventsPage";
import GrievancesPage from "./features/grievances/pages/GrievancesPage";
import BloodBankPage from "./features/blood-bank/pages/BloodBankPage";
import AcademicsPage from "./features/academics/pages/AcademicsPage";
import StudentWelfarePage from "./features/student-welfare/pages/StudentWelfarePage";
import EmergencyPage from "./features/emergency/pages/EmergencyPage";
import MagazinePage from "./features/magazine/pages/MagazinePage";
import UniversityMapPage from "./features/university-map/pages/UniversityMapPage";
import NotificationsPage from "./features/notifications/pages/NotificationsPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import AcademicMaintainerPage from "./features/academic-maintainer/pages/AcademicMaintainerPage";
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";
import AdminUsersPage from "./features/admin/pages/AdminUsersPage";

function ProtectedRoute({ user }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default function AppRoutes({ user, onLogin, onLogout }) {
  const currentRole = user?.role || "student";

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={onLogin} />} />

      <Route element={<ProtectedRoute user={user} />}>
        <Route element={<StudentLayout user={user} role={currentRole} onLogout={onLogout} />}>
          <Route path="/" element={<HomePage role={currentRole} user={user} />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/grievances" element={<GrievancesPage />} />
          <Route path="/blood" element={<BloodBankPage />} />
          <Route path="/academics" element={<AcademicsPage role={currentRole} />} />
          <Route path="/welfare" element={<StudentWelfarePage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/map" element={<UniversityMapPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage role={currentRole} user={user} onLogout={onLogout} />} />
          <Route path="/maintainer" element={<AcademicMaintainerPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

