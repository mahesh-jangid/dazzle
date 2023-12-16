/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function DifferentMovementHomeIcon({ page }: { page: string }) {
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <svg
      aria-label="Home"
      className="cursor-pointer"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
      fill={
        page === 'Home'
          ? darkMode
            ? '#f1f5f9'
            : '#262626'
          : darkMode
          ? '#262626'
          : 'white'
      }
    >
      <path
        strokeWidth={page === 'Home' ? '0' : '2'}
        stroke={
          page === 'Home'
            ? darkMode
              ? '#f1f5f9'
              : '#262626'
            : darkMode
            ? '#f1f5f9'
            : '#262626'
        }
        d="M12 2L1 12h3v8h6v-6h4v6h6v-8h3L12 2z"
      />
      <path
        fill={
          page === 'Home'
            ? darkMode
              ? '#f1f5f9'
              : '#262626'
            : darkMode
            ? '#f1f5f9'
            : '#262626'
        }
        d="M17 10h-1V8h-4v2H8V7H7v4H5v8h14v-8h-2v-4h-1z"
      />
    </svg>
  );
}

export default DifferentMovementHomeIcon;
