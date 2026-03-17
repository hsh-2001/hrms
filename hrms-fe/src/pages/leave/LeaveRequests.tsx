import { useEffect } from "react";
import MyInput from "../../components/shares/input/MyInput";
import MySelection from "../../components/shares/select/MySelection";
import useLeave from "../../hooks/useLeave";
import BaseHeader from "../../components/shares/BaseHeader";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const LeaveRequestsPage = () => {
  const {
    requestModel,
    setRequestModel,
    getLeaveTypes,
    leaveTypes,
    submitLeaveRequest,
  } = useLeave();

  const navigator = useNavigate();

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
      <BaseHeader headerTitle="Leave Requests">
        <div>
          <PrimaryButton
            name="My Requests"
            onClick={() => {
              navigator("/leave/reports");
            }}
          />
        </div>
      </BaseHeader>
      <div className="px-2">
        <form className="space-y-4 max-w-2xl mx-auto bg-gray-50 p-4 rounded-md shadow">
          <div className="grid gap-2">
            <MyInput
              label="Start Date"
              type="date"
              id="start_date"
              onChange={(e) =>
                setRequestModel({ ...requestModel, start_date: e.target.value, end_date: "" })
              }
              value={requestModel.start_date}
              disabledDate={(current) => {
                if (!current) return false;
                const today = dayjs();
                return current.isBefore(today, "day") && current.isSame(today, "month");
              }}
            />
            <MyInput
              label="End Date"
              id="end_date"
              type="date"
              disabled={!requestModel.start_date}
              onChange={(e) =>
                setRequestModel({ ...requestModel, end_date: e.target.value })
              }
              value={requestModel.end_date}
              disabledDate={(current) => {
                if (!current) return false;
                const today = dayjs();
                const startDate = requestModel.start_date ? dayjs(requestModel.start_date) : null;
                const isPastToday = current.isBefore(today, "day") && current.isSame(today, "month");
                const isBeforeStart = startDate ? current.isBefore(startDate, "day") : false;
                return isPastToday || isBeforeStart;
              }}
            />
            <MySelection
              label="Leave Type"
              id="leave_type_id"
              onChange={(e) => {
                setRequestModel({
                  ...requestModel,
                  leave_type_id: e.target.value,
                });
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
          <div>
            <span className="text-red-400">
              You will be taking leave for{" "}
              {requestModel.start_date && requestModel.end_date
                ? Math.ceil(
                    (new Date(requestModel.end_date).getTime() -
                      new Date(requestModel.start_date).getTime()) /
                      (1000 * 3600 * 24)
                  ) + 1
                : 0} day(s)
            </span>

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
