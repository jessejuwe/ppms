import { userActions } from '../slices/user-slice';
import { uiActions } from '../slices/ui-slice';
import { AppDispatch } from '../store/store';
import { SignUpData, SignInData } from '@/model';
import { SignUpURL } from '@/helpers/urls';

// Custom Action Creator for sending user data
export const sendSignUpData = (userData: SignUpData) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    dispatch(
      uiActions.updateNotification({
        status: 'pending',
        title: 'Registering ...',
        message: 'Registering, please wait ...',
      })
    );

    const sendRequest = async () => {
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
      await sendRequest();

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
export const fetchSignUpData = () => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(SignUpURL);

      // Guard Clause
      if (!response.ok) throw new Error('Data fetching failed!');

      const data = await response.json();

      return data;
    };

    try {
      const userData: SignUpData = await fetchData();
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
