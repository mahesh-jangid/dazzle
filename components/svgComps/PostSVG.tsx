import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function PostSVG() {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <svg
    aria-label="Chess Game"
    color={darkMode ? '#f1f5f9' : '#262626'}
    fill={darkMode ? '#f1f5f9' : '#262626'}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <rect
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      width="18"
      x="3"
      y="3"
    />
    {/* Burnt Chess Knight */}
    <circle cx="12" cy="12" r="4" fill="#8B4513" />
    <line
      fill="none"
      stroke="#8B4513"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12"
      x2="12"
      y1="12"
      y2="6"
    />
    <line
      fill="none"
      stroke="#8B4513"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12"
      x2="9"
      y1="12"
      y2="9"
    />
    <line
      fill="none"
      stroke="#8B4513"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12"
      x2="15"
      y1="12"
      y2="9"
    />
  </svg>  
  );
}

export default PostSVG;
