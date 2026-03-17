import { useEffect } from "react";
import useLeave from "../../hooks/useLeave";
import BaseHeader from "../../components/shares/BaseHeader";
import BaseDialog from "../../components/shares/BaseDialog";
import MyInput from "../../components/shares/input/MyInput";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import Tag from "antd/es/tag";
import { Button } from "antd";
import type { IUpdateLeaveRequest } from "../../types/leave";
import usePermission from "../../hooks/usePermission";

const LeaveReportsPage = () => {
  const {
    leaveRequests,
    getLeaveRequest,
    isUpdateRequestVisible,
    setIsUpdateRequestVisible,
    isApprove,
    setIsApprove,
    updateModel,
    setUpdateModel,
    handleUpdateLeave,
  } = useLeave();

  const { isEditable } = usePermission("leave/reports");

  useEffect(() => {
    getLeaveRequest();
  }, []);

  const { t } = useTranslation();

  const getLeavTypeColor = (leaveType: string) => {
    switch (leaveType.toLowerCase()) {
      case "unpaid leave":
        return "bg-red-500/20 text-red-500";
      case "annual leave":
        return "bg-green-500/20 text-green-500";
      case "sick leave":
        return "bg-pink-500/20 text-pink-500";
      case "paternity leave":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "green";
      case "rejected":
        return "red";
      case "pending":
        return "blue";
      default:
        return "gray";
    }
  }

  return (
    <div className="w-full">
      <BaseHeader headerTitle={t ? t("Leave Reports") : "Leave Reports"} />
      <div className="table-scroll px-2">
        <table className="min-w-200">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Request Date</th>
              <th>Employee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              {isEditable && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>
                  <span className={`text-gray-50 text-sm px-2 p-1 rounded-md ${getLeavTypeColor(request.leave_type_name)}`}>{request.leave_type_name}</span>
                </td>
                <td>{request.requestDateForDisplay}</td>
                <td>{request.employee_name}</td>
                <td>{request.startDateForDisplay}</td>
                <td>{request.endDateForDisplay}</td>
                <td>{request.reason}</td>
                <td>
                  <Tag
                    color={getStatusColor(request.status)}
                    style={{ cursor: "pointer" }}
                  >
                    {request.status}
                  </Tag>
                </td>
                {isEditable && (
                  <td className="flex gap-2 items-center">
                    {request.status.toLowerCase() === "pending" ? (
                      <>
                        <Button
                          style={{ border: "1px solid red", color: "red" }}
                          disabled={request.status.toLowerCase() !== "pending"}
                          onClick={() => {
                            setIsUpdateRequestVisible(true);
                            setIsApprove(false);
                            setUpdateModel({
                              ...updateModel,
                              id: request.id,
                              status: "Rejected",
                            });
                          }}
                        >
                          {t("Reject")}
                        </Button>
                        <Button
                          style={{ border: "1px solid green", color: "green" }}
                          disabled={request.status.toLowerCase() !== "pending"}
                          onClick={() => {
                            setIsUpdateRequestVisible(true);
                            setIsApprove(true);
                            setUpdateModel({
                              ...updateModel,
                              id: request.id,
                              status: "Approved",
                            });
                          }}
                        >
                          {t("Approve")}
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {t("Action completed")}
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateLeaveRequestDialog
        t={t}
        isApprove={isApprove}
        isOpen={isUpdateRequestVisible}
        onClose={() => setIsUpdateRequestVisible(false)}
        updateModel={updateModel}
        setUpdateModel={setUpdateModel}
        handleUpdateLeave={() => {
          handleUpdateLeave();
        }}
      />
    </div>
  );
};

export default LeaveReportsPage;

interface dialogProps {
  isOpen: boolean;
  isApprove: boolean;
  updateModel: IUpdateLeaveRequest;
  handleUpdateLeave: () => void;
  setUpdateModel: (model: IUpdateLeaveRequest) => void;
  onClose: () => void;
  t: TFunction;
}
const UpdateLeaveRequestDialog = ({
  isOpen = false,
  onClose,
  t,
  isApprove,
  updateModel,
  setUpdateModel,
  handleUpdateLeave,
}: dialogProps) => {
  return (
    <>
      <BaseDialog title="Confirm" isOpen={isOpen} isCentered onClose={onClose}>
        <div className={`flex flex-col gap-4 w-100`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateLeave();
            }}
          >
            <MyInput
              id="reason"
              labelWidth="min-w-18"
              label={t("Reason")}
              value={updateModel.reason}
              onChange={(e) =>
                setUpdateModel({ ...updateModel, reason: e.target.value })
              }
              required={!isApprove}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button onClick={onClose}>
                <span>{t("Cancel")}</span>
              </Button>
              <Button
                htmlType="submit"
                style={{
                  border: `1px solid ${isApprove ? "green" : "red"}`,
                  color: isApprove ? "green" : "red",
                }}
              >
                <span>{isApprove ? t("Approve") : t("Reject")}</span>
              </Button>
            </div>
          </form>
        </div>
      </BaseDialog>
    </>
  );
};
