import React from 'react'

const CompanyLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="url(#gold-gradient)" strokeWidth="10"/>
      <path d="M30 70L50 30L70 70H30Z" fill="url(#gold-gradient)"/>
      <defs>
        <linearGradient id="gold-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/>
          <stop offset="1" stopColor="#FFA500"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default CompanyLogo

