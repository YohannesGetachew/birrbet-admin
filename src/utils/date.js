const convertFromUnix = (timestamp) => {
  const dateObject = new Date(parseInt(timestamp));
  const readableDateFormat = dateObject.toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return readableDateFormat;
};
const TODAY_IN_MS = Math.round(new Date().getTime());
const getDurationInMS = (durationInDays) => {
  return durationInDays * 24 * 60 * 60 * 1000;
};

export { convertFromUnix, getDurationInMS, TODAY_IN_MS };
