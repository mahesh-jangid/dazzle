import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function TikTokAddPostSVG() {
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <svg
      aria-label="New post"
      className="ml-[10px] cursor-pointer sm:ml-[22px]"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        fill={darkMode ? '#1C1C1C' : '#FFF'}
        stroke={darkMode ? '#f1f5f9' : '#262626'}
        strokeWidth="2"
      />
      <path
        d="M12 7v5m0 0v5m0-5h5m-5 0H7"
        fill="none"
        stroke={darkMode ? '#f1f5f9' : '#262626'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default TikTokAddPostSVG;
