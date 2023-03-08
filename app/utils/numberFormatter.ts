export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, '');

  if (number.length < 5) return number;
  if (number.length < 8) return number.replace(/(\d{4})(\d{1})/, '$1-$2');
  if (number.length < 11)
    return number.replace(/(\d{4})(\d{3})(\d{1})/, '$1-$2-$3');

  return number.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
};
