export const formatDateInProjectSummary = (inputDate: string) => {
  if (inputDate === null) return;
  const dateObject = new Date(inputDate);

  const day = String(dateObject.getDate()).padStart(2, "0");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = dateObject.getMonth();
  const month = monthNames[monthIndex];
  const year = dateObject.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const getQuarter = (date: Date) => {
  const month = date.getMonth() + 1;
  if (month >= 1 && month <= 3) return "Q1";
  if (month >= 4 && month <= 6) return "Q2";
  if (month >= 7 && month <= 9) return "Q3";
  return "Q4";
};

export const getPreviousQuarter = (currentQuarter: string) => {
  switch (currentQuarter) {
    case "Q1":
      return "Q4";
    case "Q2":
      return "Q1";
    case "Q3":
      return "Q2";
    case "Q4":
      return "Q3";
    default:
      return "Q1";
  }
};
