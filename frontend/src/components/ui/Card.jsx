import React from "react";
import Reveal from "./Reveal";

export default function Card({ children, className = "" }) {
  return (
    <Reveal>
      <div className={`card ${className}`}>{children}</div>
    </Reveal>
  );
}
