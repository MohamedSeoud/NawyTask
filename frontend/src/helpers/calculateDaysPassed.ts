import { differenceInDays, parseISO } from "date-fns";

const calculateDaysPassed = (dateString:string) => {
  const parsedDate = parseISO(dateString);
  const currentDate = new Date();
  return differenceInDays(currentDate, parsedDate);
};

export default calculateDaysPassed;
