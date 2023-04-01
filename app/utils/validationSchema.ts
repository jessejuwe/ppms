import * as Yup from 'yup';

import {
  firstNameRegEx,
  lastNameRegEx,
  fullNameRegEx,
  emailRegEx,
  phoneNumberRegEx,
  mediumRegEx,
} from './regEX';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(firstNameRegEx, 'Invalid name')
    .required('Required'),
  lastName: Yup.string()
    .matches(lastNameRegEx, 'Invalid name')
    .required('Required'),
  email: Yup.string().matches(emailRegEx, 'Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneNumberRegEx, 'Invalid phone number')
    .required('Required'),
  password: Yup.string()
    .matches(mediumRegEx, 'Enter a valid Password')
    .required('Required'),
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegEx, 'Invalid email').required('Required'),
  password: Yup.string()
    .matches(mediumRegEx, 'Enter a valid Password')
    .required('Required'),
});

export const CandRegSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(fullNameRegEx, 'Invalid name')
    .required('Required'),
  highest_qualification: Yup.string().required('Required'),
  school_attended: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  state_of_origin: Yup.string().required('Required'),
  local_govt: Yup.string().required('Required'),
  community: Yup.string().required('Required'),
  email: Yup.string().matches(emailRegEx, 'Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneNumberRegEx, 'Invalid phone number')
    .required('Required'),
  skills_of_interest: Yup.string().required('Required'),
  acquired_skill: Yup.string(),
  preferred_location: Yup.string().required('Required'),
});

export const ProgramExecutionSchema = Yup.object().shape({
  prog_code: Yup.string().required('Required'),
  prog_name: Yup.string().required('Required'),
  prog_coordinator: Yup.string().required('Required'),
  prog_duration: Yup.string().required('Required'),
  projected_cost: Yup.string().required('Required'),
  date_of_assignment: Yup.string().required('Required'),
});

export const StudRegSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(fullNameRegEx, 'Invalid name')
    .required('Required'),
  school_name: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  state_of_origin: Yup.string().required('Required'),
  local_govt: Yup.string().required('Required'),
  town: Yup.string().required('Required'),
  community: Yup.string().required('Required'),
  email: Yup.string().matches(emailRegEx, 'Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneNumberRegEx, 'Invalid phone number')
    .required('Required'),
  support_scheme: Yup.string().required('Required'),
  school_id: Yup.object().required('File Required'),
  admission_letter: Yup.object().required('File Required'),
  last_semester_result: Yup.object().required('File Required'),
});

export const IncidentReportingSchema = Yup.object().shape({
  incident_type: Yup.string().required('Required'),
  incident_date: Yup.string().required('Required'),
  incident_desc: Yup.string().required('Required'),
  extent_of_damage: Yup.string().required('Required'),
  state_of_origin: Yup.string().required('Required'),
  local_govt: Yup.string().required('Required'),
  community: Yup.string().required('Required'),
  forward_report: Yup.boolean().required('Required'),
});

export const ProjectEnlistmentSchema = Yup.object().shape({
  proj_code: Yup.string().required('Required'),
  proj_contractor: Yup.string().required('Required'),
  contract_duration: Yup.string().required('Required'),
  contract_sum: Yup.string().required('Required'),
  date_of_award: Yup.string().required('Required'),
  dept_in_charge: Yup.string().required('Required'),
  payment_status: Yup.string().required('Required'),
});

export const ItemEnlistmentSchema = Yup.object().shape({
  item_code: Yup.string().required('Required'),
  item_model: Yup.string().required('Required'),
  item_qty: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  vendor: Yup.string().required('Required'),
});
