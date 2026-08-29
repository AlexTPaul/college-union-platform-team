import React from "react";
import { useOutletContext } from "react-router-dom";
import { Megaphone, ChevronRight } from "lucide-react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";
export default function Announcements(){ const {notify}=useOutletContext(); return <><PageHead eyebrow="OFFICIAL COMMUNICATION" title="Announcements" desc="Important union and campus notices." action={<button className="primary" onClick={()=>notify("Demo: announcement composer opened")}>+ New announcement</button>}/><div className="filterbar"><button className="filter active">All</button><button className="filter">Academic</button><button className="filter">Union</button><button className="filter">Campus</button><button className="filter">Urgent</button></div><div className="notice-list">{[
 ["Library extended hours during exam season","The central library will remain open until 10:00 PM from September 1–12.","Academic","Today","normal"],
 ["Student Welfare Week","Scholarship, internship and fellowship opportunities have been updated.","Union","Today","normal"],
 ["Inter-Department Football Registration","Registration closes on September 4 at 11:59 PM.","Sports","Yesterday","normal"],
 ["⚠ Emergency water-supply notice","Block C water maintenance scheduled for 2:00–4:00 PM.","Urgent","Aug 27","urgent"]
].map((n,i)=><Card key={i} className={n[4]==="urgent"?"urgent-card":""}><div className="notice"><div className="notice-icon"><Megaphone size={19}/></div><div><div className="notice-top"><span className="pill">{n[2]}</span><small>{n[3]}</small></div><h3>{n[0]}</h3><p>{n[1]}</p><button className="textbtn">Read notice <ChevronRight size={14}/></button></div></div></Card>)}</div></>}