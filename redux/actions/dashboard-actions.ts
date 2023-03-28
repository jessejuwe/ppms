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

import { firestore, candidateRegCollection } from '@/firebase/clientApp';
import { uiActions } from '../slices/ui-slice';
import { AppDispatch } from '../store/store';
import { CandReg } from '@/model';

// Custom Action Creator for sending user data
export const uploadCandRegData = (uploadData: CandReg) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: CandReg = {
      firstName: uploadData.firstName,
      lastName: uploadData.lastName,
      highest_qualification: uploadData.highest_qualification,
      school_attended: uploadData.school_attended,
      address: uploadData.address,
      state_of_origin: uploadData.state_of_origin,
      local_govt: uploadData.local_govt,
      town: uploadData.town,
      community: uploadData.community,
      email: uploadData.email,
      phoneNumber: uploadData.phoneNumber,
      skill_of_interest: uploadData.skill_of_interest,
      acquired_skills: uploadData.acquired_skills,
      preferred_location: uploadData.preferred_location,
      timeStamp: uploadData.timeStamp,
    };

    try {
      await addDoc(candidateRegCollection, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Registration complete',
          message: 'Candidate has been registered successfully',
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
