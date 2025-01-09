export const validateInputs = (data: any, confirmPassword: string) => {
  const errors: any = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!data.id_number.trim()) {
    errors.id_number = "ID number is required.";
  } else if (!/^\d+$/.test(data.id_number)) {
    errors.id_number = "ID number must contain only numbers.";
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

export const validatePasswordInputs = (
  password: string,
  confirmPassword: string
) => {
  const errors: any = {};
  if (!password.trim()) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export const validateRequestAppointmentInputs = (
  selectedMode: string,
  reason: string
) => {
  const errors: any = {};
  if (!selectedMode.trim()) {
    errors.selectedMode = "Please select mode.";
  }

  if (!reason.trim()) {
    errors.reason = "Reason is required.";
  }
  return errors;
};

export const validateUpdatePasswordInputs = (
  currentPassword: string,
  newPassword: string
) => {
  const errors: any = {};
  if (currentPassword && !newPassword.trim()) {
    errors.newPassword = "New password is required.";
  } else if (currentPassword && newPassword.length < 6) {
    errors.newPassword = "New password must be at least 6 characters long.";
  }
  return errors;
};
