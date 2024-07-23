export const generateRandomCharID = (name: string) => {
  const filteredName = name.replace(/\s+/g, "");
  let result = "";
  const nameLength = filteredName.length;
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * nameLength);
    result += filteredName[randomIndex].toUpperCase();
  }
  return result;
};
