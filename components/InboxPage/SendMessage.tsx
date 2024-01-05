import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function SendMessage({
  setCreateChatRoom,
  move
}: {
  setCreateChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
  move: boolean;
}) {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <div className={`absolute bottom-0 top-0 ${move ? 'left-[0px]':'left-[130px]'} flex ${move ? 'w-[calc(100%-3px)]':'w-[calc(100%-130px)]'} flex-col items-center justify-center  border-stone-200 bg-white p-6 dark:border-stone--700 dark:bg-[#1c1c1c] md:left-[350px] md:w-[calc(100%-350px)]`}>
     <svg
  aria-label="Add Friend"
  color={darkMode ? '#f1f5f9' : '#262626'}
  fill="#262626"
  height="40"
  role="img"
  viewBox="0 0 96 96"
  width="40"
>
  {/* Circle background */}
  <circle
    cx="48"
    cy="48"
    fill="none"
    r="47"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  />

  {/* Plus sign for "Add Friend" */}
  <line
    fill="none"
    stroke="currentColor"
    strokeLinejoin="round"
    strokeWidth="2"
    x1="45"
    x2="51"
    y1="48"
    y2="48"
  />
  <line
    fill="none"
    stroke="currentColor"
    strokeLinejoin="round"
    strokeWidth="2"
    x1="48"
    x2="48"
    y1="45"
    y2="51"
  />

  {/* Girl icon */}
  <circle cx="30" cy="30" r="10" fill="#ff69b4" />

  {/* Boy icon */}
  <rect x="62" y="22" width="16" height="16" fill="#87CEEB" />

</svg>

      <h1 className="mt-3 text-center text-xl dark:text-slate-100">
        Your messages
      </h1>
      <p className="mt-2 text-center text-xs text-gray-500">
        Send private photos and messages to a friend or group.
      </p>
      <button
        className="mt-6 rounded-[4px] bg-[#c46806] px-2 py-1 text-sm font-semibold text-white dark:text-[#fff]"
        type="button"
        onClick={() => setCreateChatRoom(true)}
      >
        Add friends
      </button>
    </div>
  );
}

export default SendMessage;
