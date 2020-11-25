import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import { convertFromUnix } from "../../../utils/date";

const getUsersReportTableInfo = (users) => {
  const usersReportData = [];
  users.forEach((user) => {
    const userCreatedDate = convertFromUnix(user.createdAt);
    const dateIndex = usersReportData.findIndex(
      (report) => convertFromUnix(report.date) === userCreatedDate
    );
    if (dateIndex < 0) {
      usersReportData.push({ date: user.createdAt, count: 1 });
    } else {
      usersReportData[dateIndex].count = usersReportData[dateIndex].count + 1;
    }
  });
  const usersReportColumns = [
    {
      name: "date",
      label: "Date",
      ...getDateConfig(),
    },
    {
      name: "count",
      label: "Customers registered",
      options: {
        ...getCustomFilterListOptions("Customers registered"),
      },
    },
  ];
  return { data: usersReportData, columns: usersReportColumns };
};

export default getUsersReportTableInfo;
