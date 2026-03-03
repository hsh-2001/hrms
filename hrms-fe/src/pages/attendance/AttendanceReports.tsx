import { useEffect } from "react";
import useCheckAttendance from "../../hooks/useCheckAttendance";
import BaseHeader from "../../components/shares/BaseHeader";

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
                <th>Check-in Time</th>
                <th>Check-out Time</th>
                <th>Attendance Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyAttendanceReport.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.check_in_time}</td>
                  <td>{attendance.check_out_time}</td>
                  <td>{attendance.attendanceDateForDisplay}</td>
                  <td>{attendance.status}</td>
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
