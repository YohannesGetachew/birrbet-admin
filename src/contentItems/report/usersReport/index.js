import { convertFromUnix } from "../../../utils/date";

const getUsersReportTableInfo = (users) => {
  const usersReportData = [];
  users.forEach((user) => {
    const userCreatedDate = convertFromUnix(user.createdAt);
    const dateIndex = usersReportData.findIndex(
      (report) => report.date === userCreatedDate
    );
    if (dateIndex < 0) {
      usersReportData.push({ date: userCreatedDate, count: 1 });
    } else {
      usersReportData[dateIndex].count = usersReportData[dateIndex].count + 1;
    }
  });
  const usersReportColumns = [
    {
      name: "date",
      label: "Date",
    },
    {
      name: "count",
      label: "Count",
    },
  ];
  return { data: usersReportData, columns: usersReportColumns };
};

export default getUsersReportTableInfo;
