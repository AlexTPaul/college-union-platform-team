import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import { Bell, ChevronRight, Menu } from "lucide-react";

const labels = {
  "/": "Home", "/announcements":"Announcements", "/events":"Events", "/grievances":"Grievances",
  "/blood":"Blood Bank", "/academics":"Academics", "/welfare":"Student Welfare",
  "/emergency":"Emergency Hub", "/magazine":"Union Magazine", "/map":"University Map",
  "/notifications":"Notifications", "/profile":"Profile"
};

export default function StudentLayout({ role, setRole }) {
  const [toast,setToast]=useState("");
  const notify=(msg)=>{setToast(msg); setTimeout(()=>setToast(""),2200);}
  const [mobileOpen,setMobileOpen]=useState(false);
  const navigate=useNavigate();
  const location=useLocation();
  const go=(key)=>navigate(key==="home"?"/":`/${key}`);
  const label=labels[location.pathname] || "UnionHub";
  return <div className="app">
    <Sidebar page={location.pathname==="/"?"home":location.pathname.slice(1)} go={go} open={mobileOpen} close={()=>setMobileOpen(false)} role={role}/>
    <main className="main">
      <header className="topbar">
        <button className="iconbtn mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button>
        <div className="crumb"><span>UnionHub</span><ChevronRight size={15}/><b>{label}</b></div>
        <div className="top-actions">
          <label className="searchbox"><input placeholder="Search platform..." /></label>
          <button className="iconbtn" onClick={()=>navigate("/notifications")}><Bell size={19}/><i>3</i></button>
          <select className="role-select" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="student">Student Demo</option>
            <option value="maintainer">Academic Maintainer</option>
            <option value="admin">Super Admin</option>
          </select>
        </div>
      </header>
      <div className="content"><Outlet context={{go,notify,role}} /></div>
    </main>
    {toast && <div className="toast">{toast}</div>}
  </div>;
}
