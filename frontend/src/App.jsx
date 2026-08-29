import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

export default function App(){
  const [role,setRole] = useState("student");
  return <BrowserRouter><AppRoutes role={role} setRole={setRole}/></BrowserRouter>;
}
