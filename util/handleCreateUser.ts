import React from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import handleCreateUsernameQueryArray from './handleCreateUsernameQueryArray';
import app from './firebaseConfig';

interface SubmitUser {
  username: string;
  email: string;
  password: string;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
}

async function submitUser({
  username,
  email,
  password,
  setIsSubmit,
  setLoading,
  setPasswordFormErrors,
}: SubmitUser) {
  const auth = getAuth();
  const db = getFirestore(app);

  // Check if the email already exists
  const emailDocRef = doc(db, 'userList', email);
  const emailDocSnap = await getDoc(emailDocRef);

  if (emailDocSnap.exists()) {
    setPasswordFormErrors('Email already exists');
  } else {
    // Proceed with user creation
    const usernameDocRef = doc(db, 'userList', username);
    const usernameDocSnap = await getDoc(usernameDocRef);

    if (usernameDocSnap.exists()) {
      setPasswordFormErrors('Username already exists');
    } else {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const userId = userCredential.user.uid;
          updateProfile(userCredential.user, {
            displayName: username,
          });

          // add username and email to global list
          setDoc(doc(db, 'userList', username), {});
          setDoc(doc(db, 'userList', email), {});

          // create user post collection
          setDoc(doc(db, `${username}Posts`, 'userPosts'), {
            createdAt: serverTimestamp(),
            postsListArray: [],
          });

          setDoc(doc(db, 'users', username), {
            userId: userId,
            avatarURL: '',
            chatRoomIds: [],
            messageCount: 0,
            likes: false,
            likedPosts: [],
            username,
            postCount: 0,
            followers: [],
            following: [],
            story: '',
            storyViews: [],
            heartNotifications: [],
            newHeart: false,
            usernameQuery: handleCreateUsernameQueryArray(username),
          })
            .then(() => {
              // Profile updated!
              setIsSubmit(true);
            })
            .catch((errorProfile) => {
              console.log(errorProfile);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          setPasswordFormErrors(error.message.slice(22, -2));
          setLoading(false);
        });
    }
  }
}

// ... (rest of the code remains unchanged)


interface HandleCreateUser {
  e: any;
  listeners: any[];
  username: string;
  email: string;
  password: string;
  passwordFormErrors: string;
  emailFormErrors: string;
  usernameFormErrors: string;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
}

function handleCreateUser({
  e,
  listeners,
  username,
  email,
  password,
  passwordFormErrors,
  emailFormErrors,
  usernameFormErrors,
  setIsSubmit,
  setLoading,
  setPasswordFormErrors,
}: HandleCreateUser) {
  e.preventDefault();
  if (
    passwordFormErrors === '' &&
    emailFormErrors === '' &&
    usernameFormErrors === ''
  ) {
    listeners.forEach((unsubscribe: any) => unsubscribe());
    submitUser({
      username,
      email,
      password,
      setIsSubmit,
      setLoading,
      setPasswordFormErrors,
    });
  }
}

export default handleCreateUser;








// import React from 'react';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
// import {
//   doc,
//   getDoc,
//   getFirestore,
//   setDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import handleCreateUsernameQueryArray from './handleCreateUsernameQueryArray';
// import app from './firbaseConfig';

// interface SubmitUser {
//   username: string;
//   email: string;
//   password: string;
//   setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
// }

// async function submitUser({
//   username,
//   email,
//   password,
//   setIsSubmit,
//   setLoading,
//   setPasswordFormErrors,
// }: SubmitUser) {
//   const auth = getAuth();
//   const db = getFirestore(app);

//   const docRef = doc(db, 'userList', username);
//   const docSnap = await getDoc(docRef);
//   let userId: any;

//   if (docSnap.exists()) {
//     setPasswordFormErrors('Username already exists');
//   } else {
//     setLoading(true);

//     await createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         userId = userCredential.user.uid;
//         updateProfile(userCredential.user, {
//           displayName: username,
//         });
//       })
//       .catch((error) => {
//         setPasswordFormErrors(error.message.slice(22, -2));
//       });

//     // add username to global list
//     await setDoc(doc(db, 'userList', username), {});

//     // create user post collection
//     await setDoc(doc(db, `${username}Posts`, 'userPosts'), {
//       createdAt: serverTimestamp(),
//       postsListArray: [],
//     });

//     setDoc(doc(db, 'users', username), {
//       // eslint-disable-next-line object-shorthand
//       userId: userId,
//       avatarURL: '',
//       chatRoomIds: [],
//       messageCount: 0,
//       likes: false,
//       likedPosts: [],
//       username,
//       postCount: 0,
//       followers: [],
//       following: [],
//       story: '',
//       storyViews: [],
//       heartNotifications: [],
//       newHeart: false,
//       usernameQuery: handleCreateUsernameQueryArray(username),
//     })
//       .then(() => {
//         // Profile updated!
//         setIsSubmit(true);
//       })
//       .catch((errorProfile) => {
//         console.log(errorProfile);
//       });
//   }
// }

// interface HandleCreateUser {
//   e: any;
//   listeners: any[];
//   username: string;
//   email: string;
//   password: string;
//   passwordFormErrors: string;
//   emailFormErrors: string;
//   usernameFormErrors: string;
//   setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
// }

// function handleCreateUser({
//   e,
//   listeners,
//   username,
//   email,
//   password,
//   passwordFormErrors,
//   emailFormErrors,
//   usernameFormErrors,
//   setIsSubmit,
//   setLoading,
//   setPasswordFormErrors,
// }: HandleCreateUser) {
//   e.preventDefault();
//   if (
//     passwordFormErrors === '' &&
//     emailFormErrors === '' &&
//     usernameFormErrors === ''
//   ) {
//     listeners.forEach((unsubscribe: any) => unsubscribe());
//     submitUser({
//       username,
//       email,
//       password,
//       setIsSubmit,
//       setLoading,
//       setPasswordFormErrors,
//     });
//   }
// }

// export default handleCreateUser;
