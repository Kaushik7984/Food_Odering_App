import React from "react";
import { createPortal } from "react-dom";

export default function ModalNew({ children, className = "" ,}) {
  const OVERLAy = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.7)",
    zIndex: 1000,
  };

  const modalStle = {
    position: "fixed",
  
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "27px",
    zIndex: 1000,
  };

  return createPortal(
    <>
      <div style={OVERLAy}> </div>
      <div style={modalStle} className={`modal ${className}` }>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
}
