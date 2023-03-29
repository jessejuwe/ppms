import * as Yup from 'yup';

import {
  firstNameRegEx,
  lastNameRegEx,
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
  firstName: Yup.string()
    .matches(firstNameRegEx, 'Invalid name')
    .required('Required'),
  lastName: Yup.string()
    .matches(lastNameRegEx, 'Invalid name')
    .required('Required'),
  highest_qualification: Yup.string().required('Required'),
  school_attended: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  state_of_origin: Yup.string().required('Required'),
  local_govt: Yup.string().required('Required'),
  town: Yup.string().required('Required'),
  community: Yup.string().required('Required'),
  email: Yup.string().matches(emailRegEx, 'Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneNumberRegEx, 'Invalid phone number')
    .required('Required'),
  skills_of_interest: Yup.string().required('Required'),
  acquired_skill: Yup.string().notRequired(),
  preferred_location: Yup.string().required('Required'),
});
