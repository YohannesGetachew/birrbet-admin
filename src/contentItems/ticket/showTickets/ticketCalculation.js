export const calculateTicketReturns = (stake, totalOdds) => {
  const stakeAfterVat = (stake / 1.15).toFixed(2);
  const vatOnStake = (stake - stakeAfterVat).toFixed(2);
  let possibleWin = (stakeAfterVat * totalOdds).toFixed(2);
  let incomeTax = 0;
  if (possibleWin > 1000) {
    incomeTax = (possibleWin * 0.15).toFixed(2);
    possibleWin = (possibleWin - incomeTax).toFixed(2);
  }
  return { stakeAfterVat, vatOnStake, possibleWin, incomeTax };
};
