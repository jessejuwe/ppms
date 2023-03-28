import { FieldValue } from 'firebase/firestore';

export const initialValues: CandReg = {
  firstName: '',
  lastName: '',
  highest_qualification: '',
  school_attended: '',
  address: '',
  state_of_origin: '',
  local_govt: '',
  town: '',
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
  firstName: string;
  lastName: string;
  highest_qualification: string;
  school_attended: string;
  address: string;
  state_of_origin: string;
  local_govt: string;
  town: string;
  community: string;
  email: string;
  phoneNumber: string;
  skill_of_interest: string;
  acquired_skills: string;
  preferred_location: string;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.highest_qualification = '';
    this.school_attended = '';
    this.address = '';
    this.state_of_origin = '';
    this.local_govt = '';
    this.town = '';
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
