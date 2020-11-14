const convertFromUnix = (timestamp) => {
  const dateTime = new Date(parseInt(timestamp));
  // const readableDateFormat = dateObject.toLocaleString("en-GB", {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  // });
  const formattedDate = getFormattedDate(dateTime);
  return formattedDate;
};

const TODAY_IN_MS = Math.round(new Date().getTime());

const getDurationInMS = (durationInDays) => {
  return durationInDays * 24 * 60 * 60 * 1000;
};

const getBeginningOfWeek = () => {
  const today = new Date();
  const dayOfTheWeek = today.getDay() || 7;
  if (dayOfTheWeek !== 1) today.setHours(-24 * (dayOfTheWeek - 1));
  return getFormattedDate(today);
};

const getWeekRelativeToThisWeek = (numberOfWeeksFromToday) => {
  const beginningOfWeek = new Date(getBeginningOfWeek());
  beginningOfWeek.setHours(24 * 7 * numberOfWeeksFromToday);
  return getFormattedDate(beginningOfWeek);
};

const getMonthRelativeToThisMonth = (numberOfMonthsFromFirstMonth) => {
  const beginningOfMonth = new Date(getBeginningOfMonth());
  const thisMonth = beginningOfMonth.getMonth();
  beginningOfMonth.setMonth(thisMonth + numberOfMonthsFromFirstMonth);
  return getFormattedDate(beginningOfMonth);
};

const getBeginningOfMonth = () => {
  const today = new Date();
  const dayOfTheMonth = today.getDate();
  if (dayOfTheMonth !== 1) today.setHours(-24 * (dayOfTheMonth - 1));
  return getFormattedDate(today);
};

const getDateRelativeToToday = (numberOfDaysFromToday) => {
  const today = new Date();
  today.setHours(24 * numberOfDaysFromToday);
  return getFormattedDate(today);
};

const getFormattedDate = (dateTime) => {
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

export {
  convertFromUnix,
  getDurationInMS,
  TODAY_IN_MS,
  getFormattedDate,
  getBeginningOfWeek,
  getBeginningOfMonth,
  getDateRelativeToToday,
  getWeekRelativeToThisWeek,
  getMonthRelativeToThisMonth,
};
