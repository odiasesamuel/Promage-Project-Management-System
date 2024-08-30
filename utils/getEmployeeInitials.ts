export const getEmployeeInitials = (fullName: string) => {
  const names = fullName.split(" ");
  const firstNameInitial = names[0] ? names[0][0] : "";
  const lastNameInitial = names.length > 1 ? names[names.length - 1][0] : "";

  return `${firstNameInitial}${lastNameInitial}`;
};
