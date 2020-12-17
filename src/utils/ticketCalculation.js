export const calculateTicketReturns = (stake, totalOdds, maxWin) => {
  totalOdds = totalOdds.toFixed(2);
  const stakeAfterVat = (stake / 1.15).toFixed(2);
  const vatOnStake = (stake - stakeAfterVat).toFixed(2);
  let possibleWin = (stakeAfterVat * totalOdds).toFixed(2);

  if (possibleWin > maxWin) {
    possibleWin = maxWin;
  }
  let incomeTax = 0;
  if (possibleWin > 1000) {
    incomeTax = (possibleWin * 0.15).toFixed(2);
    possibleWin = (possibleWin - incomeTax).toFixed(2);
  }

  return {
    stakeAfterVat,
    vatOnStake,
    possibleWin: +possibleWin,
    incomeTax,
    roundedTotalOdds: totalOdds,
  };
};

// appLogo: "https://res.cloudinary.com/dtz77duv8/image/upload/v1604746758/new_birrbet_logo_wpmm19.png"
// appName: "Birr bet"
// bookmaker: 8
// commissionRate: 0.15
// currentTime: "1606182369354"
// maxStake: 1000
// maxWin: 200000
// minStake: 30
// rules: "<p>new rule</p>"
// vatRate: 0.15
// withdrawalLimit: 1000
// __typename: "App"
// _id: "5fafbbe36342556d5d74a0e3"
