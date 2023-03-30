import { FieldValue } from 'firebase/firestore';

export const initialValues: IncidentReporting = {
  incident_type: '',
  incident_date: '',
  incident_desc: '',
  extent_of_damage: '',
  state_of_origin: '',
  local_govt: '',
  community: '',
  forward_report: false,
  timeStamp: undefined,
};

class IncidentReporting {
  id?: string;
  incident_type: string;
  incident_date: string;
  incident_desc: string;
  extent_of_damage: string;
  state_of_origin: string;
  local_govt: string;
  community: string;
  forward_report: boolean;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.incident_type = '';
    this.incident_date = '';
    this.incident_desc = '';
    this.extent_of_damage = '';
    this.state_of_origin = '';
    this.local_govt = '';
    this.community = '';
    this.forward_report = false;
    this.timeStamp = undefined;
  }
}

export default IncidentReporting;
