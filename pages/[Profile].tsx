// Import necessary modules and components
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import Link from 'next/link';
import type { NextPage } from 'next';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import Header from '../components/header/Header';
import UnfollowUser from '../components/profilePages/UnfollowUser';
import AddProfilePhoto from '../components/profilePages/AddProfilePhoto';
import handleFollowUser from '../util/handleFollowUser';
import PostSVG from '../components/svgComps/PostSVG';
import useCheckUserName from '../hooks/useCheckUserName';
import FollowingSVG from '../components/svgComps/FollowingSVG';
import CameraSVG from '../components/svgComps/CameraSVG';
import ProfilePicSVG from '../components/svgComps/ProfilePicSVG';
import LoadingPage from '../components/loadingComps/LoadingPage';
import UserPost from '../components/profilePages/UserPost';
import useGetOtherUserPosts from '../hooks/useGetOtherUserPosts';
import atoms from '../util/atoms';
import LoadingUserPosts from '../components/loadingComps/LoadingUserPosts';
import useHandleFollowerFollowingDropDown from '../hooks/useHandleFollowerFollowingDropDown';
import FollowerFollowingDisplay from '../components/profilePages/FollowerFollowingDisplay';
import UserDoesNotExist from '../components/profilePages/UserDoesNotExist';
import VerificationBadge from '../components/VerificationBadge';


// Define the Profile component
const Profile: NextPage = () => {
  const router = useRouter();
  console.log('router',router)
  const [isUserVerified, setIsUserVerified] = useState(false);
// console.log("vvv",firestore)
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const username = router.query.Profile;
      console.log('uuu',username)

      // Ensure that username is defined and is a string
      if (typeof username === 'string') {
        // Use getFirestore to get Firestore instance
        const db = getFirestore();

        // Construct the user document reference
        const userDocRef = doc(db, 'users', username);
        console.log('nnn',userDocRef)

        // Retrieve the user document snapshot
        const userDocSnap = await getDoc(userDocRef);
        console.log('dd',userDocSnap)

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log('data',userData)

          setIsUserVerified(userData.isVerified || false);
          localStorage.setItem('isverified',JSON.stringify(isUserVerified))
        }
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  fetchUserData();
});

  const nameSearch = router.query.Profile;

  const [userStatus] = useAtom(atoms.userStatus);
  const [userPosts] = useAtom(atoms.userPosts);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [userPorfileLoading, setUserPorfileLoading] = useAtom(
    atoms.userPorfileLoading
  );

  useEffect(() => {
    setUserPorfileLoading(false);
  }, []);

  const [addPhoto, setAddPhoto] = React.useState(false);
  const [unfollow, setUnfollow] = React.useState(false);
  const [showFollowing, setShowFollowing] = React.useState(false);
  const [showFollowers, setShowFollowers] = React.useState(false);

  useHandleFollowerFollowingDropDown({ setShowFollowing, setShowFollowers });

  const user = useCheckUserName({ nameSearch, queryCharacter: false });

  const otherUser = useGetOtherUserPosts({
    user,
    nameSearch,
    limitSearch: false,
  });

  const profilePosts = user.otherUser ? otherUser.profilePosts : userPosts;
  const profileDetails = user.otherUser ? {} : userDetails;
  const profileNotifications = user.otherUser
    ? user.otherUserNotifications
    : userNotifications;

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  if (user.checkingUser && nameSearch !== userDetails.displayName) {
    return <LoadingPage checkingUserRoute />;
  }

  if (!user.userExists && !user.checkingUser) {
    return <UserDoesNotExist search={nameSearch} />;
  }

  return (
    <div className="h-[100vh] overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
      <Head>
        <title>Profile • dazzlone photos and videos</title>
        <meta name="description" content="Dazzlone, social media app dazzlone" />
        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
      </Head>
      <Header page="Profile" />
      {addPhoto ? <AddProfilePhoto setAddPhoto={setAddPhoto} /> : <div />}
      <div className="mx-auto max-w-[935px] pt-6 sm:pt-8">
        <div className="flex items-stretch border-b border-stone-300 pb-7 dark:border-stone-700 sm:pb-11">
          <button
            className="relative mr-7 min-w-[80px] sm:mr-10 sm:grow-[1]"
            onClick={() =>
              nameSearch === profileDetails.displayName ? setAddPhoto(true) : ''
            }
            type="button"
          >
            {profileDetails.photoURL || profileNotifications.avatarURL ? (
              <Image
                className="profilephotodesign ml-4 h-20 w-20 select-none rounded-full object-cover sm:ml-0 sm:h-[150px] sm:w-[150px]"
                src={profileDetails.photoURL! || profileNotifications.avatarURL!}
                alt="avatar"
                width="150"
                height="150"
              />
            ) : (
              <div className="h-20 w-20 sm:h-[150px] sm:w-[150px]">
                <ProfilePicSVG strokeWidth="1" />
              </div>
            )}
            {nameSearch === profileDetails.displayName ? (
              <div className="absolute bottom-0 left-20 sm:left-[130px]">
                <CameraSVG />
              </div>
            ) : (
              ''
            )}
          </button>
          <div className="grow-[3]">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h1 className="usernamedesign my-5 text-3xl">
                {profileDetails.displayName || profileNotifications.username} {isUserVerified && <VerificationBadge />}
              </h1>
              {nameSearch === profileDetails.displayName ? (
                ''
              ) : (
                <div className="flex flex-row items-center pb-2 sm:pl-7 sm:pb-0">
                  <Link href="/Inbox">
                    <a>
                      <p className="mr-2  rounded-[4px] border border-stone-300 py-1 px-2 text-sm font-semibold dark:border-stone-700">
                        Message
                      </p>
                    </a>
                  </Link>
                  <div className=" overflow-hidden rounded-[4px] text-sm font-semibold">
                    {userNotifications?.following?.includes(
                      profileNotifications.username!
                    ) ? (
                      <div>
                        <button
                          aria-label='button'
                          type="button"
                          onClick={() => {
                            setUnfollow(true);
                            document.body.style.overflow = 'hidden';
                          }}
                        >
                          <FollowingSVG />
                        </button>
                        {unfollow ? (
                          <UnfollowUser
                            setUnfollow={setUnfollow}
                            imgURL={profileNotifications.avatarURL!}
                            username={profileNotifications.username!}
                            userNotifications={userNotifications}
                            profileNotifications={profileNotifications}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleFollowUser({
                            userName: userNotifications?.username!,
                            otherUserName: profileNotifications.username!,
                          })
                        }
                      >
                        <p className="bg-[#0095F6] py-1 px-6 text-white">
                          Follow
                        </p>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            {profileNotifications.userId ? (
              <div className="hidden sm:flex">
                <FollowerFollowingDisplay
                  showFollowers={showFollowers}
                  showFollowing={showFollowing}
                  profileNotifications={profileNotifications}
                  setShowFollowers={setShowFollowers}
                  setShowFollowing={setShowFollowing}
                />
              </div>
            ) : (
              <div className="hidden h-4 w-[250px] animate-pulse rounded-sm bg-[#efefef] dark:bg-[#313131] sm:block sm:h-6" />
            )}
          </div>
        </div>
        {profileNotifications.userId ? (
          <div className="border-b border-stone-300 py-4 dark:border-stone-700 sm:hidden">
            <FollowerFollowingDisplay
              showFollowers={showFollowers}
              showFollowing={showFollowing}
              profileNotifications={profileNotifications}
              setShowFollowers={setShowFollowers}
              setShowFollowing={setShowFollowing}
            />
          </div>
        ) : (
          <div className="mx-auto my-4 h-10 w-[250px] animate-pulse rounded-sm bg-[#efefef] dark:bg-[#313131] sm:hidden" />
        )}
        <div>
          <div className="flex items-center justify-center gap-2 py-3 sm:py-6">
            <PostSVG />
            <p className="text-xs font-semibold sm:text-sm">History</p>
          </div>
          <div
            className={`${
              userPorfileLoading ? 'fixed opacity-0' : ''
            } grid max-w-[935px] grid-cols-3 gap-1 pb-10 sm:gap-4`}
          >
            {profilePosts.slice(0, -1).map((postInformation) => (
              <UserPost
                key={postInformation.postID}
                postInformation={postInformation}
                postUserDetails={profileNotifications}
              />
            ))}
          </div>
          {userPorfileLoading ? <LoadingUserPosts /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Profile;
