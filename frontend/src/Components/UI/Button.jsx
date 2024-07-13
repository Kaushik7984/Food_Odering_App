import React from "react";

export default function Button({ children, textOnly, className, ...props }) {
  const cssClass = textOnly ? `text-button ` : "button";

  return <button className={cssClass} {...props}>{children}</button>;
}
