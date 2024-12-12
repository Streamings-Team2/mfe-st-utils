export const getInitials = (fullName: string): string => {
  const names = fullName.split(" ");
  if (names.length >= 2) {
    return names[0][0].toUpperCase() + names[1][0].toUpperCase();
  }
  return fullName[0]?.toUpperCase() || "";
};

const infoDataFunctions = {
  getInitials,
};

export default infoDataFunctions;
