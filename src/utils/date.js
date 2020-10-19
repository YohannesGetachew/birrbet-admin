const convertFromUnix = (timestamp) => {
  const dateObject = new Date(parseInt(timestamp));
  const readableDateFormat = dateObject.toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return readableDateFormat;
};

export { convertFromUnix };
