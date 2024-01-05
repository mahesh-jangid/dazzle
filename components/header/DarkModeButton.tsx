import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function DarkModeButton() {
  const [darkMode, setDarkMode] = useAtom(atoms.darkMode);

  useEffect(() => {
    // Check local storage for dark mode preference
    const storedDarkMode = localStorage.getItem('darkModeInstagram');
    
    if (storedDarkMode === 'true') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [setDarkMode]);

  function handleDarkMode() {
    if (darkMode) {
      localStorage.setItem('darkModeInstagram', 'false');
    } else {
      localStorage.setItem('darkModeInstagram', 'true');
    }

    setDarkMode(!darkMode);
  }

  return (
    <button
      className="fixed bottom-20 right-0 p-4"
      onClick={() => handleDarkMode()}
      type="button"
    >
      <div id='darkd' className="flex items-center gap-2 rounded-xl bg-[#fff] py-[2px] px-1 dark:bg-[#0a4970]">
        <picture>
          <img
            className="darkd h-[13px] w-[30x] select-none"
            src={darkMode ? '/moon.png' : '/sun.png'}
            alt={darkMode ? 'moon' : 'sun'}
          />
        </picture>
      </div>
    </button>
  );
}

export default DarkModeButton;
