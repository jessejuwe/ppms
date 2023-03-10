export const firstNameRegEx = new RegExp(/^[A-Z][A-Za-z]{2,15}$/);

export const lastNameRegEx = new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);

export const emailRegEx = new RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

// export const phoneNumberRegEx = new RegExp(
//   /^([0-9]{4})[-]?([0-9]{3})[-]?([0-9]{4})$/
// );

export const phoneNumberRegEx = new RegExp(/^([0-9]{4})([0-9]{3})([0-9]{4})$/);

export const strongPasswordRegEx = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);

export const mediumRegEx = new RegExp(
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
);
