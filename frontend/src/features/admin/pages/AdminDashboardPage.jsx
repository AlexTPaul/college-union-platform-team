import React from "react";
import { ShieldCheck, Users, CalendarDays, ClipboardList, BookOpen, GraduationCap } from "lucide-react";
import { Card, PageHead, RevealGroup } from "../../../components/common/PagePrimitives";
export default function AdminDashboardPage(){
  return <>
    <PageHead eyebrow="MANAGEMENT" title="Admin Dashboard" desc="Demo control room for the College Union platform."/>
    <RevealGroup className="stats">
      <div className="stat"><div className="stat-icon"><Users size={19}/></div><div><small>Active students</small><strong>2,482</strong></div></div>
      <div className="stat"><div className="stat-icon"><CalendarDays size={19}/></div><div><small>Upcoming events</small><strong>12</strong></div></div>
      <div className="stat"><div className="stat-icon"><ClipboardList size={19}/></div><div><small>Open grievances</small><strong>18</strong></div></div>
      <div className="stat"><div className="stat-icon"><BookOpen size={19}/></div><div><small>Academic materials</small><strong>620</strong></div></div>
    </RevealGroup>
    <div className="two-col">
      <Card><h3>Management shortcuts</h3><div className="quickgrid">{
        [["academics","Academics","Manage departments/materials",BookOpen],["welfare","Student Welfare","Manage opportunity listings",GraduationCap],["events","Events","Create and publish events",CalendarDays],["grievances","Grievances","Review issue queue",ClipboardList]].map(([k,t,s,I])=>
          <div className="quick" key={k}><div className="quick-icon"><I size={20}/></div><div><b>{t}</b><span>{s}</span></div></div>)
      }</div></Card>
      <Card><h3>Governance</h3><p>Role and content changes are recorded for audit purposes.</p><div className="role-banner"><ShieldCheck size={20}/><div><b>Demo admin controls</b><span>Real database permissions will be connected in the production integration.</span></div></div></Card>
    </div>
  </>;
}
