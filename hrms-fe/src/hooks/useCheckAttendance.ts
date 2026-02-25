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
    status: "present",
  });

  const handleCheckAttendance = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
     const updatedModel = {
      ...checkModel,
      employee_id: String(user.user?.id || "1"),
      check_in_time: attendance.check_in_time ? attendance.check_in_time : currentTime,
      check_out_time: attendance.check_in_time ? currentTime : null,
    };
    setCheckModel(updatedModel);
    try {
      const response = await attendanceApi.checkAttendance(updatedModel);
      if (response.isSuccess) {
        alert("Attendance checked successfully!");
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
