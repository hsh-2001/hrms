import { useEffect } from "react";
import useLeave from "../../hooks/useLeave";
import BaseHeader from "../../components/shares/BaseHeader";
import { Edit } from "lucide-react";
import { Tag } from "antd";

const LeaveReportsPage = () => {
  const { leaveRequests, getLeaveRequest } = useLeave();

  useEffect(() => {
    getLeaveRequest();
  }, []);

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Leave Reports" />
      <div className="px-2 max-w-screen overflow-x-auto">
        <table className="min-w-200">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.leave_type_name}</td>
                <td>{request.startDateForDisplay}</td>
                <td>{request.endDateForDisplay}</td>
                <td>{request.reason}</td>
                <td>
                  <Tag color="blue">{request.status}</Tag>
                </td>
                <td className="">
                  <Edit className="cursor-pointer text-gray-500" size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveReportsPage;
