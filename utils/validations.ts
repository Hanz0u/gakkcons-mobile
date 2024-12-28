export const validateInputs = (data: any, confirmPassword: string) => {
  const errors: any = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (!data.password.trim()) {
    errors.password = "Password is required.";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (data.password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};
