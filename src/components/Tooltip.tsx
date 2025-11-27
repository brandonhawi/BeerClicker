"use client";

import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  placement?: "top" | "right" | "bottom" | "left";
};

export default function Tooltip({ children, title, placement = "top" }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap pointer-events-none ${placementClasses[placement]}`}
        >
          {title}
        </div>
      )}
    </div>
  );
}
