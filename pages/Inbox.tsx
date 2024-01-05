/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import ChatRoom from '../components/InboxPage/ChatRoom';
import CreateChatRoom from '../components/InboxPage/CreateChatRoom';
import SendMessage from '../components/InboxPage/SendMessage';
import LoadingPage from '../components/loadingComps/LoadingPage';
import Header from '../components/header/Header';
import atoms from '../util/atoms';
import LoadingChatRooms from '../components/loadingComps/LoadingChatRooms';
import handleResetNewMessage from '../util/handleResetNewMessage';

const Inbox: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [chatRoomLoading, setChatRoomLoading] = useAtom(atoms.chatRoomLoading);

  const [activeChat, setActiveChat] = React.useState('');
  const [move,setmove]= useState(false)
  const [createChatRoom, setCreateChatRoom] = React.useState(false);
  useEffect(() => {
    // This code will be executed when the component has mounted
    setChatRoomLoading(false);
  }, []);
  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="h-screen cursor-default overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
      <Head>
        <title>dazzlone • Chats</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
      </Head>
      <Header page="Inbox" />
      {createChatRoom ? (
        <CreateChatRoom setCreateChatRoom={setCreateChatRoom} />
      ) : (
        <div />
      )}
      <div className="messagebordedesign relative mx-auto mt-0 h-[calc(100%-140px)] max-w-[100%] border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c] sm:h-[calc(100%-90px)]">
        <div className="flex h-[50px] w-[100px] items-center border-b border-stone-200 dark:border-stone-700 md:w-[350px] md:px-5">
          {/* <button
          aria-label='button'
            onClick={() => setCreateChatRoom(!createChatRoom)}
            type="button"
          >
            <NewMessageSVG />
          </button> */}
        </div>
        {activeChat === '' ? (
          <SendMessage move={move} setCreateChatRoom={setCreateChatRoom} />
        ) : (
          <div />
        )}
        <div className={`${ move ? 'w-[0px]': 'w-[100px]'} h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden dark:[color-scheme:dark] md:w-[350px]`}>
          <div
            className={chatRoomLoading ? 'fixed opacity-0' : ''}
          >
            {userNotifications?.chatRoomIds?.map((chatRoomId, index) => (
              <div
                key={`chatRoomKey${index}`}
                onClick={() => {
                  setActiveChat(`chatRoom${index}`);
                  handleResetNewMessage({
                    username: userDetails.displayName!,
                    chatRoomId,
                  });
                }}
                aria-label='button'
                role="button"
                tabIndex={0}
              >
                <ChatRoom
                  chatRoomID={chatRoomId}
                  userID={userDetails.displayName!}
                  activeChat={activeChat}
                  move={move}
                  activeChatId={`chatRoom${index}`}
                />
              </div>
            ))}
          </div>
          {chatRoomLoading && !userNotifications?.chatRoomIds ? (
            <LoadingChatRooms />
          ) : (
            ''
          )}

        </div>
        <button type='button' id='chatbottonn' className={`${move ? 'moving':''} activee`} onClick={()=>setmove(!move)}>⟪ ⟫</button>

      </div>
    </div>
  );
};

export default Inbox;
