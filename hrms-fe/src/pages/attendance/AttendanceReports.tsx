import { useEffect } from "react";
import useCheckAttendance from "../../hooks/useCheckAttendance";
import BaseHeader from "../../components/shares/BaseHeader";
import { Tag } from "antd";

const AttendanceReportsPage = () => {
  const { getAttendanceReportByCompanyId, companyAttendanceReport } =
    useCheckAttendance();
  useEffect(() => {
    getAttendanceReportByCompanyId();
  }, []);
  return (
    <div>
      <BaseHeader headerTitle="Attendance Report" />
      <div className="px-2">
        {companyAttendanceReport && companyAttendanceReport.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Check-in Time</th>
                <th>Check-out Time</th>
                <th>Re-check-in Time</th>
                <th>Re-check-out Time</th>
                <th>Reason</th>
                <th>Attendance Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyAttendanceReport.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.full_name}</td>
                  <td>{attendance.check_in_time || "--"}</td>
                  <td>{attendance.check_out_time || "--"}</td>
                  <td>{attendance.re_check_in_time || "--"}</td>
                  <td>{attendance.re_check_out_time || "--"}</td>
                  <td>{attendance.reason || "N/A"}</td>
                  <td>{attendance.attendanceDateForDisplay}</td>
                  <td>
                    <Tag color={attendance.status === "checked_in" ? "blue" : attendance.status === "checked_out" ? "green" : "orange"}>
                      {attendance.status}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceReportsPage;
