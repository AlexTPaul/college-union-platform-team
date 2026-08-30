import React, { useState } from "react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";

const defaultPreferences = {
  Announcements: true,
  Events: true,
  "Grievance updates": true,
  "Welfare opportunities": true,
  "Academic materials": true,
  Magazine: false,
};

export default function Profile({ role, user, onLogout }) {
  const currentUser = user || { name: "Aswin P.", initials: "AP", email: "student@college.local" };
  const [profile, setProfile] = useState({
    fullName: currentUser.name || "Aswin P.",
    department: "Computer Science",
    semester: "Semester 5",
    email: currentUser.email || "student@college.local",
    phone: "+91 98765 43210",
    notifications: { ...defaultPreferences },
  });
  const [saved, setSaved] = useState(false);

  const roleLabel = role === "student" ? "Student" : role === "maintainer" ? "Academic Maintainer" : "Super Admin";

  const handleFieldChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (key) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSave = () => {
    const initials = profile.fullName
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "U";

    const nextUser = {
      ...currentUser,
      name: profile.fullName,
      email: profile.email,
      initials,
    };

    try {
      localStorage.setItem("unionhub-user", JSON.stringify(nextUser));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      setSaved(false);
    }
  };

  return (
    <>
      <PageHead eyebrow="ACCOUNT" title="Profile" desc="Manage your account details and preferences." />

      <Card className="profile-card">
        <div className="big-avatar">{currentUser.initials || "AP"}</div>
        <div>
          <span className="eyebrow">{roleLabel.toUpperCase()} PROFILE</span>
          <h2>{profile.fullName}</h2>
          <p>
            {profile.department} · {profile.semester} · ID {currentUser.id || "2026CSE042"}
          </p>
          <div className="profile-pills">
            <span className="pill">{roleLabel}</span>
            <span className="pill">Active</span>
          </div>
        </div>
      </Card>

      <div className="settings-grid">
        <Card>
          <h3>Account information</h3>
          <label>
            Full name
            <input value={profile.fullName} onChange={(e) => handleFieldChange("fullName", e.target.value)} />
          </label>
          <label>
            Email
            <input value={profile.email} onChange={(e) => handleFieldChange("email", e.target.value)} />
          </label>
          <label>
            Department
            <select value={profile.department} onChange={(e) => handleFieldChange("department", e.target.value)}>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Business</option>
            </select>
          </label>
          <label>
            Semester
            <select value={profile.semester} onChange={(e) => handleFieldChange("semester", e.target.value)}>
              <option>Semester 1</option>
              <option>Semester 3</option>
              <option>Semester 5</option>
              <option>Semester 7</option>
            </select>
          </label>
          <label>
            Phone
            <input value={profile.phone} onChange={(e) => handleFieldChange("phone", e.target.value)} />
          </label>

          <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
            <button type="button" className="primary" onClick={handleSave}>
              {saved ? "Saved" : "Save changes"}
            </button>
            <button type="button" className="outline" onClick={onLogout}>
              Log out
            </button>
          </div>
        </Card>

        <Card>
          <h3>Notification preferences</h3>
          {Object.keys(profile.notifications).map((key) => (
            <div className="toggle" key={key}>
              <span>{key}</span>
              <input
                type="checkbox"
                checked={profile.notifications[key]}
                onChange={() => handleNotificationToggle(key)}
              />
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}