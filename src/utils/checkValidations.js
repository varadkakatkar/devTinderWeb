const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateEmail = (emailId) => {
  if (!emailId?.trim()) {
    return "Email is required";
  }
  if (!emailRegex.test(emailId.trim())) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password?.trim()) {
    return "Password is required";
  }
  return "";
};
