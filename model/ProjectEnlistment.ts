import { FieldValue } from 'firebase/firestore';

export const initialValues: ProjectEnlistment = {
  proj_code: '',
  proj_contractor: '',
  contract_duration: '',
  contract_sum: '',
  date_of_award: '',
  dept_in_charge: '',
  payment_status: '',
  timeStamp: undefined,
};

class ProjectEnlistment {
  id?: string;
  proj_code: string;
  proj_contractor: string;
  contract_duration: string;
  contract_sum: string;
  date_of_award: string;
  dept_in_charge: string;
  payment_status: string;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.proj_code = '';
    this.proj_contractor = '';
    this.contract_duration = '';
    this.contract_sum = '';
    this.date_of_award = '';
    this.dept_in_charge = '';
    this.payment_status = '';
    this.timeStamp = undefined;
  }
}

export default ProjectEnlistment;
