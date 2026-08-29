import React from "react";
import { Home, Megaphone, CalendarDays, ClipboardList, Droplets, BookOpen, GraduationCap, ShieldAlert, Newspaper, Map, Bell, UserRound, ShieldCheck, LogOut, X, Sparkles } from "lucide-react";
import { modules } from "../../data/demo/modules";
export default function Sidebar({ page, go, open, close, role }){
  return <aside className={"sidebar "+(open?"open":"")}>
    <div className="brand"><div className="brandmark"><Sparkles size={19}/></div><div><b>UnionHub</b><small>College Union</small></div><button className="iconbtn close-side" onClick={close}><X size={18}/></button></div>
    <div className="side-label">MAIN</div>
    <nav>{modules.map(([key,label,Icon])=><button key={key} className={page===key?"active":""} onClick={()=>go(key)}><Icon size={18}/><span>{label}</span>{key==="notifications"&&<em>3</em>}</button>)}</nav>
    <div className="side-label">MANAGEMENT</div>
    <button className={"admin-link "+(role!=="student"?"visible":"")} onClick={()=>role!=="student"&&go(role==="maintainer"?"maintainer":"admin")}><ShieldCheck size={18}/><span>{role==="maintainer"?"Maintainer Console":"Admin Console"}</span></button>
    <div className="sidebar-bottom"><div className="user-mini"><div className="avatar">AP</div><div><b>Aswin P.</b><small>{role==="student"?"CSE • Semester 5":role==="maintainer"?"Academic Maintainer":"Super Admin"}</small></div></div><button className="logout" onClick={()=>alert("Demo only — logout is not connected.")}><LogOut size={17}/></button></div>
  </aside>
}