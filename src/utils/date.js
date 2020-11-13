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

const getFormattedDate = (dateTime) => {
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

export { convertFromUnix, getDurationInMS, TODAY_IN_MS, getFormattedDate };
