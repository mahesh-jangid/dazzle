/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function GurudevSVGIcon({ page }: { page: string }) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [showPopUp, setShowPopUp] = useState(false);

  let interval: any;  // Declare the interval variable outside the useEffect

  useEffect(() => {
    if (page !== 'Gurudev') {
      // Start the interval when on a different page
      interval = setInterval(() => {
        setShowPopUp(true);

        // Hide the pop-up after 2 seconds
        setTimeout(() => {
          setShowPopUp(false);
        }, 2000);
      }, 10000);
    } else {
      // Clear the interval when on the 'Gurudev' page
      clearInterval(interval);
    }

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
        {showPopUp && (
          <div className="pop-up" style={{ padding: '2px', borderRadius: '50%', backgroundColor: darkMode ? '#262626' : 'white', color: darkMode ? '#f1f5f9' : '#262626', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 24 24" width="10">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 18l-1.41-1.41L9.17 12 2.59 5.41 4 4l7 7-7 7z" />
            </svg>
            <span style={{ marginLeft: '2px', fontSize: '10px' }}>Hi!</span>
          </div>
        )}
      </div>

      <svg
        aria-label="Genie Lamp"
        className={`cursor-pointer ${page === 'Gurudev' ? 'animate-different-movement' : ''}`}
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        fill={page === 'Gurudev' ? (darkMode ? '#f1f5f9' : '#262626') : (darkMode ? '#262626' : 'white')}
      >
        <style>
          {`
            @keyframes different-movement {
              0% {
                transform: translateY(0) rotate(0deg);
              }
              25% {
                transform: translateY(-4px) rotate(-5deg);
              }
              50% {
                transform: translateY(0) rotate(0deg);
              }
              75% {
                transform: translateY(-4px) rotate(5deg);
              }
              100% {
                transform: translateY(0) rotate(0deg);
              }
            }

            .animate-different-movement {
              animation: different-movement 1s ease-in-out infinite;
            }
          `}
        </style>
        {/* Magic Lamp */}
        <path  fill="#065180" d="M12 4c1.7 0 3 1.3 3 3 0 .6-.2 1.3-.6 1.8L18 15v4h-1c-1.1 0-2 .9-2 2H9c0-1.1-.9-2-2-2H6v-4l3-6.2c-.4-.5-.6-1.2-.6-1.8 0-1.7 1.3-3 3-3z" />
        {/* Lamp Handle */}
        <path fill="#795548" d="M11 2v4h2V2h-2z" />
      </svg>
    </div>
  );
}

export default GurudevSVGIcon;
