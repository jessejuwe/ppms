import { FieldValue } from 'firebase/firestore';

export const initialValues: StudReg = {
  fullName: '',
  school_name: '',
  department: '',
  address: '',
  state_of_origin: '',
  local_govt: '',
  community: '',
  email: '',
  phoneNumber: '',
  support_scheme: '',
  school_id: null,
  admission_letter: null,
  last_semester_result: null,
  timeStamp: undefined,
};

class StudReg {
  id?: string;
  fullName: string;
  school_name: string;
  department: string;
  address: string;
  state_of_origin: string;
  local_govt: string;
  community: string;
  email: string;
  phoneNumber: string;
  support_scheme: string;
  school_id: File | null;
  admission_letter: File | null;
  last_semester_result: File | null;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.fullName = '';
    this.school_name = '';
    this.department = '';
    this.address = '';
    this.state_of_origin = '';
    this.local_govt = '';
    this.community = '';
    this.email = '';
    this.phoneNumber = '';
    this.support_scheme = '';
    this.school_id = null;
    this.admission_letter = null;
    this.last_semester_result = null;
    this.timeStamp = undefined;
  }
}

export default StudReg;
