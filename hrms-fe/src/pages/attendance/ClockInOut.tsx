import BaseHeader from "../../components/shares/BaseHeader";
import { Calendar, Moon } from "lucide-react";
import useCheckAttendance from "../../hooks/useCheckAttendance";
import { Tag } from "antd";

export default function ClockInOut() {
  const {
    today,
    currentTime,
    currentSeconds,
    handleCheckAttendance,
    attendance,
  } = useCheckAttendance();

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Clock In/Out" />
      <div className="p-4 bg-gray-100 rounded-[20px]">
        <div className="grid place-items-center gap-2 items-center justify-center">
          <div className="bg-black/10 px-4 py-2 text-lg rounded-full text-gray-700 flex items-center">
            <Calendar size={18} className="inline-block mr-1 text-green-500" />
            <span>{today}</span>
          </div>
          <div className="flex gap-1">
            <span className=" text-8xl font-bold">{currentTime}</span>
            <span className="text-2xl self-end">
              {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
            </span>
          </div>
          <div>
            <Moon size={18} className="inline-block ml-2 text-yellow-300" />
            <span className="text-gray-600">
              The time is synchronized with your system clock
            </span>
          </div>

          <button
            onClick={handleCheckAttendance}
            className={`
              w-80 py-3 rounded-full text-lg hover:bg-green-600 transition-colors my-4 cursor-pointer ${attendance?.check_in_time ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          >
            <span className="text-lg">
              {attendance?.check_in_time ? "Check Out" : "Check In"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="bg-gray-100 p-4 rounded-[20px] mb-2">
          <div className="grid grid-cols-2 text-sm">
            <div>
              <p>Date: {attendance?.attendance_date}</p>
              <p>Check-in Time: {attendance?.check_in_time || "N/A"}</p>
                <p>Check-out Time: {attendance?.check_out_time || "N/A"}</p>
              </div>
              <div>
                <p>
                  <span>Status:</span>
                  <Tag className="text-xl" color="blue">
                    {attendance?.status}
                  </Tag>
                </p>
                <p>Re-check-in Time: {attendance?.re_check_in_time || "N/A"}</p>
                <p>
                  Re-check-out Time: {attendance?.re_check_out_time || "N/A"}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
