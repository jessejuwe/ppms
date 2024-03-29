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
  collection,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { User } from 'firebase/auth';
import { v4 } from 'uuid';

import { firestore, usersDashboardCol } from '@/firebase/clientApp';
import { uiActions } from '../slices/ui-slice';
import { AppDispatch } from '../store/store';
import {
  CandReg,
  ProgramExecutionModel,
  StudRegModel,
  IncidentReportingModel,
  ProjectEnlistmentModel,
  ItemEnlistmentModel,
} from '@/model';
import { storage } from '@/firebase/clientApp';

// Custom Action Creator for uploading Candidate data
export const uploadCandRegData = (uploadData: CandReg, user: User) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: CandReg = {
      fullName: uploadData.fullName,
      highest_qualification: uploadData.highest_qualification,
      school_attended: uploadData.school_attended,
      address: uploadData.address,
      state_of_origin: uploadData.state_of_origin,
      local_govt: uploadData.local_govt,
      community: uploadData.community,
      email: uploadData.email,
      phoneNumber: uploadData.phoneNumber,
      skill_of_interest: uploadData.skill_of_interest,
      acquired_skills: uploadData.acquired_skills,
      preferred_location: uploadData.preferred_location,
      timeStamp: uploadData.timeStamp,
    };

    if (!user.email) return;

    const id = `candidate_registration`;
    const col = collection(firestore, 'users_dashboard', user.email, id);

    try {
      await addDoc(col, data);

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

// Custom Action Creator for uploading Project Execution data
export const uploadProjectExecutionData = (
  uploadData: ProgramExecutionModel,
  user: User
) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: ProgramExecutionModel = {
      prog_code: uploadData.prog_code,
      prog_name: uploadData.prog_name,
      prog_coordinator: uploadData.prog_coordinator,
      prog_duration: uploadData.prog_duration,
      projected_cost: uploadData.projected_cost,
      date_of_assignment: uploadData.date_of_assignment,
      timeStamp: uploadData.timeStamp,
    };

    if (!user.email) return;

    const id = `program_execution`;
    const col = collection(firestore, 'users_dashboard', user.email, id);

    try {
      await addDoc(col, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Upload complete',
          message: 'Program Execution data has been uploaded successfully',
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

// Custom Action Creator for uploading Student data
export const uploadStudRegData = (uploadData: StudRegModel, user: User) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data = {
      fullName: uploadData.fullName,
      school_name: uploadData.school_name,
      department: uploadData.department,
      address: uploadData.address,
      state_of_origin: uploadData.state_of_origin,
      local_govt: uploadData.local_govt,
      community: uploadData.community,
      email: uploadData.email,
      phoneNumber: uploadData.phoneNumber,
      support_scheme: uploadData.support_scheme,
      timeStamp: uploadData.timeStamp,
    };

    if (!user.email) return;

    const id = `student_registration`;
    const col = collection(firestore, 'users_dashboard', user.email, id);

    const stringRef = `${user.email}/student_registration/${uploadData.fullName}`;

    // Create a child reference
    const schoolIDRef = ref(storage, `${stringRef}/school_id${v4()}`);
    // Create a child reference
    const admissionLetterRef = ref(storage, `${stringRef}/ad_letter${v4()}`);
    // Create a child reference
    const lastResultRef = ref(storage, `${stringRef}/last_result${v4()}`);

    try {
      if (uploadData.school_id == null) throw new Error('Upload School ID');
      // prettier-ignore
      if (uploadData.admission_letter == null) throw new Error('Upload Admission Letter');
      // prettier-ignore
      if (uploadData.last_semester_result == null) throw new Error('Upload Last Semester Result');

      // upload Student ID Card File
      await uploadBytes(schoolIDRef, uploadData.school_id);

      // upload Admission Letter File
      await uploadBytes(admissionLetterRef, uploadData.admission_letter);

      // upload Last Semester Result File
      await uploadBytes(lastResultRef, uploadData.last_semester_result);

      // upload Student Data
      await addDoc(col, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Registration complete',
          message: 'Student has been registered successfully',
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

// Custom Action Creator for uploading Incident Reporting data
export const uploadIncidentReportingData = (
  uploadData: IncidentReportingModel,
  user: User
) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: IncidentReportingModel = {
      incident_type: uploadData.incident_type,
      incident_date: uploadData.incident_date,
      incident_desc: uploadData.incident_desc,
      extent_of_damage: uploadData.extent_of_damage,
      state_of_origin: uploadData.state_of_origin,
      local_govt: uploadData.local_govt,
      community: uploadData.community,
      forward_report: uploadData.forward_report,
      timeStamp: uploadData.timeStamp,
    };

    if (!user.email) return;

    const id = `incident_reporting`;
    const col = collection(firestore, 'users_dashboard', user.email, id);

    try {
      await addDoc(col, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Registration complete',
          message: 'Incident has been registered successfully',
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

// Custom Action Creator for uploading Project Enlistment data
export const uploadProjectEnlistmentData = (
  uploadData: ProjectEnlistmentModel,
  user: User
) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: ProjectEnlistmentModel = {
      proj_code: uploadData.proj_code,
      proj_contractor: uploadData.proj_contractor,
      contract_duration: uploadData.contract_duration,
      contract_sum: uploadData.contract_sum,
      date_of_award: uploadData.date_of_award,
      dept_in_charge: uploadData.dept_in_charge,
      payment_status: uploadData.payment_status,
      timeStamp: uploadData.timeStamp,
    };

    if (!user.email) return;

    const id = `project_enlistment`;
    const col = collection(firestore, 'users_dashboard', user.email, id);

    try {
      await addDoc(col, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Enlistment complete',
          message: 'Project has been enlisted successfully',
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

// Custom Action Creator for uploading Incident Reporting data
export const uploadItemEnlistmentData = (
  uploadData: ItemEnlistmentModel,
  user: User
) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    const data: ItemEnlistmentModel = {
      item_code: uploadData.item_code,
      item_model: uploadData.item_model,
      item_qty: uploadData.item_qty,
      category: uploadData.category,
      vendor: uploadData.vendor,
      timeStamp: uploadData.timeStamp,
    };

    if (!user.email) return;

    const id = `item_enlistment`;
    const col = collection(firestore, 'users_dashboard', user.email, id);

    try {
      await addDoc(col, data);

      dispatch(
        uiActions.updateNotification({
          status: 'success',
          title: 'Enlistment complete',
          message: 'Item has been enlisted successfully',
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

// ***********************RETRIEVALS************************************
// Getting collection data
// Custom Action Creator for fetching user data
export const fetchCollection = (user: User, col_id: string) => {
  // returning a function that returns an action object
  return async (dispatch: AppDispatch) => {
    if (!user.email) return;

    const col = collection(firestore, 'users_dashboard', user.email, col_id);

    try {
      // Querying db collection for existing user
      const dataQuery = query(col, orderBy('timeStamp'));

      const transformedData: any[] = [];

      // const userData = await getDocs(dataQuery);
      // if (userData.empty) throw new Error('Collection not found');

      // Data transformation
      // userData.docs.forEach(doc => {
      //   transformedData.push({ ...doc.data(), id: doc.id });
      // });

      // Setting up a subscription to the collection to get realtime data
      onSnapshot(dataQuery, snapshot => {
        if (snapshot.empty) throw new Error('Collection is empty');

        // Data transformation
        snapshot.docs.forEach(doc => {
          transformedData.push({ ...doc.data(), id: doc.id });
        });
      });

      return transformedData;
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
