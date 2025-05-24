import React from "react";

export default function Loading() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-[-50%] w-8 h-8">
      <div className="relative w-full h-full animate-spin">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#ffce00"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            fill="none"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="#ffce00"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
