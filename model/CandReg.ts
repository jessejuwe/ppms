import { FieldValue } from 'firebase/firestore';

export const initialValues: CandReg = {
  fullName: '',
  highest_qualification: '',
  school_attended: '',
  address: '',
  state_of_origin: '',
  local_govt: '',
  community: '',
  email: '',
  phoneNumber: '',
  skill_of_interest: '',
  acquired_skills: '',
  preferred_location: '',
  timeStamp: undefined,
};

class CandReg {
  id?: string;
  fullName: string;
  highest_qualification: string;
  school_attended: string;
  address: string;
  state_of_origin: string;
  local_govt: string;
  community: string;
  email: string;
  phoneNumber: string;
  skill_of_interest: string;
  acquired_skills: string;
  preferred_location: string;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.fullName = '';
    this.highest_qualification = '';
    this.school_attended = '';
    this.address = '';
    this.state_of_origin = '';
    this.local_govt = '';
    this.community = '';
    this.email = '';
    this.phoneNumber = '';
    this.skill_of_interest = '';
    this.acquired_skills = '';
    this.preferred_location = '';
    this.timeStamp = undefined;
  }
}

export default CandReg;
