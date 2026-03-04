import { useState } from "react";
import leaveApi from "../lib/leaveApi";
import { GetLeaveRequestResponse, type ICreateLeaveRequest, type ILeaveType, type IUpdateLeaveRequest } from "../types/leave";
import { useAppSelector } from "../store";

export default function useLeave() {
  const user = useAppSelector((state) => state.user);
  const [leaveTypes, setLeaveTypes] = useState<ILeaveType[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<GetLeaveRequestResponse[]>([]);
  const [isUpdateRequestVisible, setIsUpdateRequestVisible] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [updateModel, setUpdateModel] = useState<IUpdateLeaveRequest>({
    id: 0,
    status: "",
    reason: "",
  });
  const [requestModel, setRequestModel] = useState<ICreateLeaveRequest>({
    employee_id: user.user?.employee_id || "",
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const getLeaveTypes = async () => {
    try {
      const result = await leaveApi.getAllLeaveTypes();
      if (result.isSuccess) {
        setLeaveTypes(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch leave types:", error);
    }
  };
  
  const submitLeaveRequest = async () => {
    try {
        const result = await leaveApi.AddLeaveRequest(requestModel);
        if (result.isSuccess) {
          console.log("Leave request submitted successfully");
        }
    } catch (error) {
        console.error("Failed to submit leave request:", error);
    }
  }

  const getLeaveRequest = async () => {
    try {
        const result = await leaveApi.getAllLeaveRequests();
        if (result.isSuccess) {
          setLeaveRequests(result.data.map((leave) => new GetLeaveRequestResponse(leave)));
        }
    } catch (error) {
        console.error("Failed to fetch leave requests:", error);
    }
  }

  const handleUpdateLeave = async () => {
    try {
      const response = await leaveApi.updateLeaveRequest(updateModel);
      if (response.isSuccess) {
        await getLeaveRequest();
        setIsUpdateRequestVisible(false);
      }
    } catch (error) {
      console.error("Failed to update leave request:", error);
    }
  }

  return {
    leaveTypes,
    getLeaveTypes,
    requestModel,
    setRequestModel,
    submitLeaveRequest,
    leaveRequests,
    getLeaveRequest,
    isUpdateRequestVisible,
    setIsUpdateRequestVisible,
    isApprove,
    setIsApprove,
    updateModel,
    setUpdateModel,
    handleUpdateLeave,
  };
}
