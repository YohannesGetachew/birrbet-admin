export const calculateTicketReturns = (stake, vatValue, totalOdds) => {
  const returnWithoutComission = (stake - vatValue) * totalOdds;
  const comission = (returnWithoutComission * 0.15).toFixed(2);
  const estimatedReturns = (returnWithoutComission - comission).toFixed(2);
  return { estimatedReturns: estimatedReturns, comission: comission };
};
