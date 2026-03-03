import { useEffect } from "react";
import MyInput from "../../components/shares/input/MyInput";
import MySelection from "../../components/shares/select/MySelection";
import useLeave from "../../hooks/useLeave";
import BaseHeader from "../../components/shares/BaseHeader";
import PrimaryButton from "../../components/shares/button/PrimaryButton";

const LeaveRequestsPage = () => {
  const {
    requestModel,
    setRequestModel,
    getLeaveTypes,
    leaveTypes,
    submitLeaveRequest,
  } = useLeave();

  useEffect(() => {
    const fetchData = async () => {
      await getLeaveTypes();
      setRequestModel({
        ...requestModel,
        leave_type_id: String(leaveTypes[0]?.id || ""),
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <BaseHeader headerTitle="Leave Requests" />
      <div className="px-2">
        <form className="space-y-4 max-w-2xl mx-auto bg-gray-50 p-4 rounded-2xl">
          <div className="grid gap-2">
            <MyInput
              label="Start Date"
              type="date"
              id="start_date"
              onChange={(e) =>
                setRequestModel({ ...requestModel, start_date: e.target.value })
              }
              value={requestModel.start_date}
            />
            <MyInput
              label="End Date"
              id="end_date"
              type="date"
              onChange={(e) =>
                setRequestModel({ ...requestModel, end_date: e.target.value })
              }
              value={requestModel.end_date}
            />
            <MySelection
              label="Leave Type"
              id="leave_type_id"
              onChange={(e) => {
                setRequestModel({
                  ...requestModel,
                  leave_type_id: e.target.value,
                })
              }}
              value={String(requestModel.leave_type_id)}
              options={leaveTypes.map((type) => ({
                label: type.name,
                value: String(type.id),
              }))}
            />
            <MyInput
              label="Reason"
              id="reason"
              onChange={(e) =>
                setRequestModel({ ...requestModel, reason: e.target.value })
              }
              value={requestModel.reason}
            />
          </div>
          <div className="flex justify-end">
            <PrimaryButton
              name="Submit Request"
              onClick={() => {
                submitLeaveRequest();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestsPage;
