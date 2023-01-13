import dayjs from "dayjs";
export function getDate( month = dayjs().month(), date = dayjs().date()) {
  date = Math.floor(date);
  const year = dayjs().year();
  // const month = dayjs().month();
  const currentDate = dayjs(new Date(year, month, date));
  return currentDate;
}