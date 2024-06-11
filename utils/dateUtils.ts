const formatDateInProjectSummary = (inputDate: string) => {
    if (inputDate === null) return;
    const dateObject = new Date(inputDate);
  
    const day = String(dateObject.getDate()).padStart(2, "0");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = dateObject.getMonth();
    const month = monthNames[monthIndex];
    const year = dateObject.getFullYear();
  
    return `${month} ${day}, ${year}`;
}

export default formatDateInProjectSummary;