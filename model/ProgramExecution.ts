import { FieldValue } from 'firebase/firestore';

export const initialValues: ProgramExecution = {
  prog_code: '',
  prog_name: '',
  prog_coordinator: '',
  prog_duration: '',
  projected_cost: '',
  date_of_assignment: '',
  timeStamp: undefined,
};

class ProgramExecution {
  id?: string;
  prog_code: string;
  prog_name: string;
  prog_coordinator: string;
  prog_duration: string;
  projected_cost: string;
  date_of_assignment: string;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.prog_code = '';
    this.prog_name = '';
    this.prog_coordinator = '';
    this.prog_duration = '';
    this.projected_cost = '';
    this.date_of_assignment = '';
    this.timeStamp = undefined;
  }
}

export default ProgramExecution;
