export const validateEmail = (email) => {
  const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (email.trim() === '') {
    return 'Please enter an email.';
  }
  if (!validation.test(email)) {
    return 'You have entered an invalid email address.';
  }
  return '';
};

export const validatePassword = (email, password) => {
  if (password.trim() === '') {
    return 'Please enter password.';
  }
  if (email === password) {
    return 'Password should not be same as email address.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return '';
};

export const validatePasswordCheck = (password, passwordCheck) => {
  if (password !== passwordCheck) {
    return "Passwords don't match.";
  }
  return '';
};
