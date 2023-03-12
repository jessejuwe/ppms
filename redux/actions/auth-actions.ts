import { uiActions } from '../slices/ui-slice';
import { AppDispatch } from '../store/store';
import { SignUpData, SignInData } from '@/model';
import { SignUpURL, SignInURL } from '@/helpers/urls';

// Custom Action Creator for sending user data
export const sendSignUpData = (userData: SignUpData) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const sendUserData = async () => {
      const data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
      };
      const requestMethod = { method: 'POST', body: JSON.stringify(data) };

      const response = await fetch(SignUpURL, requestMethod);

      // Guard Clause
      if (!response.ok) throw new Error('Authentication failed!');
    };

    try {
      await sendUserData();

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Authentication complete',
          message: 'Registration done successfully',
        })
      );
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: error.message,
          message: 'Registration failed. Fill form properly.',
        })
      );
    }
  };
};

// Custom Action Creator for fetching user data
export const fetchUserData = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(SignUpURL);

      // Guard Clause
      if (!response.ok) throw new Error('Data fetching failed!');

      const data = await response.json();

      return data;
    };

    const loadedUsers: SignUpData[] = [];

    try {
      const userData: SignUpData[] = await fetchData();

      for (const key in userData) {
        loadedUsers.push({
          key,
          id: userData[key].id,
          firstName: userData[key].firstName,
          lastName: userData[key].lastName,
          email: userData[key].email,
          phoneNumber: userData[key].phoneNumber,
          password: userData[key].password,
        });
      }

      return loadedUsers;

      // dispatch(authActions.updateUsers(payload));
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    }
  };
};

// Custom Action Creator for sending login data
export const sendLoginData = (userData: SignInData) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const sendUserData = async () => {
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };
      const requestMethod = { method: 'POST', body: JSON.stringify(data) };

      const response = await fetch(SignInURL, requestMethod);

      // Guard Clause
      if (!response.ok) throw new Error('Verification failed!');
    };

    try {
      await sendUserData();

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Verification complete',
          message: 'Verification done successfully',
        })
      );
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: error.message,
          message: 'Verification failed. Sign in properly.',
        })
      );
    }
  };
};

// Custom Action Creator for fetching user data
export const fetchLoginData = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(SignInURL);

      // Guard Clause
      if (!response.ok) throw new Error('Data fetching failed!');

      const data = await response.json();

      return data;
    };

    const loadedUsers: SignInData[] = [];

    try {
      const userData: SignInData[] = await fetchData();

      for (const key in userData) {
        loadedUsers.push({
          key,
          id: userData[key].id,
          name: userData[key].name,
          email: userData[key].email,
          password: userData[key].password,
        });
      }

      return loadedUsers;

      // dispatch(authActions.updateUsers(payload));
    } catch (error: any) {
      dispatch(
        uiActions.updateNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    }
  };
};
