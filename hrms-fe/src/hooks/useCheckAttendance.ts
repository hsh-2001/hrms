import { useEffect, useRef, useState } from "react";
import attendanceApi from "../lib/attendanceApi";
import type { IAttendance, ICreateAttendanceRequest } from "../types/attendance";
import {  useAppSelector } from "../store";

export default function useCheckAttendance() {
  const user = useAppSelector((state) => state.user);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [checkModel, setCheckModel] = useState<ICreateAttendanceRequest>({
    employee_id: "",
    check_in_time: null,
    check_out_time: null,
    re_check_in_time: null,
    re_check_out_time: null,
    attendance_date: new Date().toISOString().split("T")[0],
    status: "present",
  });

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );

  const [currentSeconds, setCurrentSeconds] = useState(new Date().getSeconds());
  const [attendance, setAttendance] = useState<IAttendance>({
    id: 0,
    employee_id: "",
    check_in_time: null,
    check_out_time: null,
    re_check_in_time: null,
    re_check_out_time: null,
    attendance_date: new Date().toISOString().split("T")[0],
    status: "checked_in",
  });

  const handleCheckAttendance = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const updatedModel = {
      ...checkModel,
      employee_id: String(user.user?.id || "1"),
      check_in_time: attendance?.check_in_time ?? currentTime,
      check_out_time: !attendance?.check_in_time
        ? null
        : attendance?.check_out_time ?? currentTime,
      re_check_in_time: !attendance?.check_out_time
        ? null
        : attendance?.re_check_in_time ?? currentTime,
      re_check_out_time: !attendance?.re_check_in_time
        ? null
        : attendance?.re_check_out_time ?? currentTime,
      status: !attendance?.check_in_time
        ? "checked_in"
        : !attendance?.check_out_time
          ? "checked_out"
          : !attendance?.re_check_in_time
            ? "re_checked_in"
            : "re_checked_out",
    };
    console.log("Model", updatedModel);
    setCheckModel(updatedModel);

    try {
      const response = await attendanceApi.checkAttendance(updatedModel);
      if (response.isSuccess) {
        getAttendanceByEmployeeId();
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
    }
  };

  const getAttendanceByEmployeeId = async () => {
    try {
      const employeeId = String(user.user?.id || "");
      const response = await attendanceApi.getTodayAttendanceByEmployeeId(employeeId);
      if (response.isSuccess) {
        setAttendance(response.data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const isCalled = useRef(false);
  useEffect(() => {
    if (isCalled.current) return;
    (async () => {
      await getAttendanceByEmployeeId();
    })();
    isCalled.current = true;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
      setCurrentSeconds(new Date().getSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    today,
    currentTime,
    currentSeconds,
    handleCheckAttendance,
    getAttendanceByEmployeeId,
    attendance,
  };
}
