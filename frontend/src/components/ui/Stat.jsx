import React from "react";
export default function Stat({ icon: Icon, label, value, trend }) {
  return (
    <div className="stat">
      <div className="stat-icon"><Icon size={19} /></div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        {trend && <span>{trend}</span>}
      </div>
    </div>
  );
}
