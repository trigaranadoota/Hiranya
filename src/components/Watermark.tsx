/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface WatermarkProps {
  type: "feather" | "branch" | "paw" | "panther" | "rhino";
  className?: string;
  opacity?: number;
}

export const Watermark: React.FC<WatermarkProps> = ({ type, className = "", opacity = 0.05 }) => {
  const getSvgContent = () => {
    switch (type) {
      case "feather":
        return (
          <path
            d="M50,10 C45,25 35,45 42,65 C45,75 52,85 50,95 M50,10 C50,25 65,40 58,65 C55,75 48,85 50,95 M50,15 C42,22 40,28 35,32 M50,25 C40,35 38,40 32,44 M50,38 C42,50 38,55 30,58 M50,50 C44,65 38,70 32,73 M50,20 C58,25 60,32 65,36 M50,32 C62,38 64,45 68,50 M50,45 C60,55 62,60 68,66 M50,60 C58,70 60,75 66,80"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        );
      case "branch":
        return (
          <path
            d="M50,95 C48,70 45,45 35,15 M35,15 C30,10 20,12 15,10 M35,15 C45,20 50,30 55,25 C58,15 45,5 40,5 M46,45 C35,35 25,40 18,30 C12,42 28,50 36,50 M44,65 C55,55 65,60 72,52 C78,65 62,70 54,72 M42,80 C32,75 22,85 15,75 C10,90 28,95 38,92"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        );
      case "paw":
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Main pad */}
            <path d="M50,60 C40,60 35,68 38,78 C40,84 45,86 50,86 C55,86 60,84 62,78 C65,68 60,60 50,60 Z" />
            {/* Toes */}
            <path d="M30,45 C25,45 22,50 24,56 C26,62 33,62 34,56 C35,50 35,45 30,45 Z" />
            <path d="M42,30 C38,30 35,35 36,42 C37,48 44,48 44,42 C44,35 46,30 42,30 Z" />
            <path d="M58,30 C62,30 65,35 64,42 C63,48 56,48 56,42 C56,35 54,30 58,30 Z" />
            <path d="M70,45 C75,45 78,50 76,56 C74,62 67,62 66,56 C65,50 65,45 70,45 Z" />
          </g>
        );
      case "panther":
        return (
          <path
            d="M10,45 C20,35 35,32 45,35 C50,37 55,42 60,40 C65,38 70,30 75,32 C80,34 85,45 90,48 C95,50 92,30 90,20 C88,15 80,10 75,12 M15,48 C18,55 22,65 24,75 C24,80 20,85 18,85 M35,45 C36,55 38,68 40,78 C40,82 42,85 45,85 M55,44 C53,52 50,65 52,75 C53,80 56,84 60,84 M70,46 C71,55 72,66 74,76 C75,80 77,83 80,83"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        );
      case "rhino":
        return (
          <path
            d="M15,50 C20,42 30,35 40,38 C42,28 44,20 40,15 C45,18 48,25 50,30 C55,24 60,18 56,12 C62,15 64,22 65,28 C70,30 78,35 83,42 C88,48 85,60 81,65 M12,50 C14,60 16,72 17,80 C18,84 22,84 25,82 M38,44 C38,55 39,68 41,76 C42,80 46,80 48,78 M60,45 C60,54 58,68 59,76 C60,80 64,80 66,78 M78,48 C77,58 76,70 78,78 C79,81 83,81 85,78"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        );
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={`select-none pointer-events-none transition-opacity duration-1000 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {getSvgContent()}
    </svg>
  );
};
