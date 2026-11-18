'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = 'h-10 w-10', size = 40 }: LogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBeanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C87D55" />
            <stop offset="50%" stopColor="#8B4B27" />
            <stop offset="100%" stopColor="#2C1810" />
          </linearGradient>
          <linearGradient id="logoGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5A87B" />
            <stop offset="100%" stopColor="#FED8CA" />
          </linearGradient>
          <linearGradient id="logoSteam" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8B4B27" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8B4B27" stopOpacity="0" />
          </linearGradient>
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2C1810" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Outer Rounded Container */}
        <rect
          x="8"
          y="8"
          width="144"
          height="144"
          rx="38"
          fill="#F6F3ED"
          stroke="#E5E2DC"
          strokeWidth="2.5"
          filter="url(#logoShadow)"
        />

        {/* Delicate Concentric Inner Ring */}
        <circle
          cx="80"
          cy="80"
          r="56"
          fill="none"
          stroke="#D8C2B8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Left Bean Half */}
        <path
          d="M 80 44 C 54 44 42 62 42 80 C 42 98 56 116 80 116 C 75 102 74 90 76 80 C 78 70 82 58 80 44 Z"
          fill="url(#logoBeanGrad)"
        />

        {/* Right Bean Half */}
        <path
          d="M 80 44 C 106 44 118 62 118 80 C 118 98 104 116 80 116 C 85 102 86 90 84 80 C 82 70 78 58 80 44 Z"
          fill="url(#logoBeanGrad)"
        />

        {/* Center Slit */}
        <path
          d="M 80 46 C 76 60 84 72 82 82 C 80 92 74 104 80 114"
          fill="none"
          stroke="url(#logoGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Steam Tendrils */}
        <path
          d="M 72 36 C 70 28 75 22 73 16"
          fill="none"
          stroke="url(#logoSteam)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 86 34 C 88 27 84 21 87 15"
          fill="none"
          stroke="url(#logoSteam)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 98 38 C 100 32 97 26 99 20"
          fill="none"
          stroke="url(#logoSteam)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Decorative Aroma Accents */}
        <circle cx="48" cy="52" r="2.5" fill="#8B4B27" opacity="0.6" />
        <circle cx="112" cy="108" r="2" fill="#8B4B27" opacity="0.5" />
      </svg>
    </div>
  );
}

