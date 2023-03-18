import {
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { persistor } from '@/redux/store/store';
import { setCookie, deleteCookie } from 'cookies-next';

import { firestore, userCollection, auth } from '@/firebase/clientApp';
import { authActions } from '../slices/auth-slice';
import { uiActions } from '../slices/ui-slice';
import { AppDispatch } from '../store/store';
import { SignUpData } from '@/model';

const provider = new GoogleAuthProvider();

// Custom Action Creator for new user
export const createNewUser = (userData: SignUpData) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(cred => {
        // Guard clauses
        if (!cred) return;
        if (!auth.currentUser) throw new Error('We could not register you');

        dispatch(sendUserData(userData)); // Upload user data
        dispatch(authActions.login(cred.user)); // Log user in

        return updateProfile(auth.currentUser, {
          displayName: `${userData.firstName} ${userData.lastName}`,
        });
      })
      .catch(error =>
        dispatch(
          uiActions.updateNotification({
            status: 'error',
            title: error.code,
            message: error.message,
          })
        )
      );
  };
}; // End of function body

// Custom Action Creator for signing in user
export const signInUser = (email: string, password: string) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        // Existing and future Auth states are now persisted indefinitely
        // Closing the window would not clear any existing state
        // State clears when a user sign out.
        // ...
        // New sign-in will be persisted with session persistence.

        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (!cred.user) throw new Error('User credentials not found');

        dispatch(authActions.login(cred.user)); // set login state in store
        setCookie('loggedIn', JSON.stringify(cred.user), {
          path: '/',
          sameSite: true,
        }); // for enabling route protection
      })
      .catch(error =>
        dispatch(
          uiActions.updateNotification({
            status: 'error',
            title: error.code,
            message: error.message,
          })
        )
      );
  };
}; // End of function body

// Custom Action Creator for signing in user with Google
export const signInUserGoogle = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result) return;

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential && credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      dispatch(authActions.login(user)); // set login state in store
      setCookie('loggedIn', JSON.stringify(user), {
        path: '/',
        sameSite: true,
      }); // for enabling route protection
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: errorCode,
          message: errorMessage,
        })
      );
    }
  };
}; // End of function body

// Custom Action Creator for signing out user
export const signOutUser = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    await signOut(auth); // sign out from firebase auth
    await persistor.purge(); // clear redux persisted state

    dispatch(authActions.logout()); // clear login state in store
    deleteCookie('loggedIn'); // delete cookie
  };
}; // End of function body

// Custom Action Creator for verfying if user is logged in
export const verifyLoggedInUser = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(authActions.login(user));
      }
    });
  };
}; // End of function body

// Custom Action Creator for sending user data
export const sendUserData = (userData: SignUpData) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: SignUpData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      timeStamp: userData.timeStamp,
    };

    try {
      await addDoc(userCollection, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Congratulations',
          message: 'Registration done successfully',
        })
      );
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: error.code,
          message: error.message,
        })
      );
    }
  };
}; // End of function body

// Getting collection data
// Custom Action Creator for fetching user data
export const fetchUserData = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    try {
      // Querying db collection for existing user
      const dataQuery = query(userCollection, orderBy('timeStamp'));

      const transformedData: any[] = [];

      const userData = await getDocs(dataQuery);
      if (userData.empty) throw new Error('Empty database collection');

      // Data transformation
      userData.docs.forEach(doc => {
        transformedData.push({ ...doc.data(), id: doc.id });
      });

      // Setting up a subscription to the collection to get realtime data
      // onSnapshot(dataQuery, snapshot => {
      //   if (snapshot.empty) throw new Error('Empty database collection');

      //   // Data transformation
      //   snapshot.docs.forEach(doc => {
      //     transformedData.push({ ...doc.data(), id: doc.id });
      //   });
      // });

      return transformedData;
    } catch (error: any) {
      console.error(error.message);
    }
  };
}; // End of function body

// Custom Action Creator for deleting user data
export const deleteUserData = (id: string) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    try {
      // Reference to document to be deleted
      const docRef = doc(firestore, 'users', id);
      await deleteDoc(docRef);
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: error.code,
          message: error.message,
        })
      );
    }
  };
}; // End of function body

// Custom Action Creator for deleting user data
export const fetchSingleUserData = (id: string) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    try {
      // Reference to document to be deleted
      const docRef = doc(firestore, 'users', id);
      const fetchedData = await getDoc(docRef);

      if (!fetchedData) throw new Error('User does not exist');

      const data = fetchedData.data();
      console.log(data);
      return data;
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: error.code,
          message: error.message,
        })
      );
    }
  };
}; // End of function body

// Custom Action Creator for deleting user data
export const updateUserData = (id: string, userData: any) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    try {
      // Reference to document to be deleted
      const docRef = doc(firestore, 'users', id);
      await updateDoc(docRef, userData);
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: error.code,
          message: error.message,
        })
      );
    }
  };
}; // End of function body
