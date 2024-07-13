import React from "react";

export default function Error({ title, message }) {
  return (
    <div style={{color:"red"}}>
      <h2>{title}</h2>
      <p>{message.toString()}</p>
    </div>
  );
}
