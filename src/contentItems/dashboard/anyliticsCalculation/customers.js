const getCustomersAnylitics = (customers) => {
  const today = Math.round(new Date().getTime());
  let createdThisWeek = 0;
  const weekInMs = 604800000;

  customers.forEach((customer) => {
    const dateDifference = today - customer.createdAt;
    const isCreatedThisWeek = dateDifference <= weekInMs;
    if (isCreatedThisWeek) {
      createdThisWeek = createdThisWeek + 1;
    }
  });
  return {
    count: customers.length.toString(),
    comparisonStartData: "This week",
    fluctuation: createdThisWeek.toString(),
  };
};

export default getCustomersAnylitics;
