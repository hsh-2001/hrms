import BaseHeader from "../../components/shares/BaseHeader";
import {
  Calendar,
  Moon,
  LogIn,
  LogOut,
  RotateCcw,
  Activity,
} from "lucide-react";
import useCheckAttendance from "../../hooks/useCheckAttendance";
import { Tag } from "antd";
import useDevice from "../../hooks/useDevice";
import { useTranslation } from "react-i18next";

export default function ClockInOut() {
  const {
    today,
    currentTime,
    currentSeconds,
    handleCheckAttendance,
    attendance,
  } = useCheckAttendance();
  const { isMobile } = useDevice();
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <BaseHeader headerTitle={t("Clock In/Out")} />
      <div className="px-2">
        <div className="p-4 bg-gray-100 rounded-[20px]">
        <div className="grid place-items-center gap-2 items-center justify-center">
          <div className="bg-white px-4 py-2 text-lg rounded-full text-gray-700 flex items-center">
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
            <span className={`text-gray-600 ${isMobile ? "text-[10px]" : "text-md"}`}>
              {t("The time is synchronized with your system clock")}
            </span>
          </div>

          <button
            onClick={handleCheckAttendance}
            disabled={!!(attendance?.check_in_time && attendance?.check_out_time)}
            className={`
              w-70 py-3 rounded-full text-lg transition-colors my-4 cursor-pointer
              ${!attendance?.check_in_time
                ? "bg-green-500 text-white hover:bg-green-600"
                : !attendance?.check_out_time
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
          >
            <span className="text-lg">
              {!attendance?.check_in_time
                ? t("Check In")
                : !attendance?.check_out_time
                  ? t("Check Out")
                  : t("Completed Mission")}
            </span>
          </button>
        </div>
      </div>
      </div>
      <div className="mt-2 px-2">
        <div className="bg-gray-100 p-4 rounded-[20px] mb-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-700">
              {t("Today's Attendance")}
            </h3>
            <Tag color={attendance?.status === "Present" ? "green" : "blue"}>
              {attendance?.status || t("N/A")}
            </Tag>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white px-3 py-2.5 rounded-lg text-center">
              <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <LogIn size={14} className="text-green-500" />
              </div>
              <p className="text-[10px] text-gray-400 mb-0.5">{t("Check-in Time")}</p>
              <p className="text-sm font-semibold text-gray-800">
                {attendance?.check_in_time || "--:--"}
              </p>
            </div>
            <div className="bg-white px-3 py-2.5 rounded-lg text-center">
              <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <LogOut size={14} className="text-red-500" />
              </div>
              <p className="text-[10px] text-gray-400 mb-0.5">{t("Check-out Time")}</p>
              <p className="text-sm font-semibold text-gray-800">
                {attendance?.check_out_time || "--:--"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white px-3 py-2.5 rounded-lg text-center">
              <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Activity size={14} className="text-purple-500" />
              </div>
              <p className="text-[10px] text-gray-400 mb-0.5">{t("Re-check-in Time")}</p>
              <p className="text-sm font-semibold text-gray-800">
                {attendance?.re_check_in_time || "--:--"}
              </p>
            </div>
            <div className="bg-white px-3 py-2.5 rounded-lg text-center">
              <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <RotateCcw size={14} className="text-orange-500" />
              </div>
              <p className="text-[10px] text-gray-400 mb-0.5">{t("Re-check-out Time")}</p>
              <p className="text-sm font-semibold text-gray-800">
                {attendance?.re_check_out_time || "--:--"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 py-4 rounded-lg bg-white mt-2 items-center justify-center">
            <div>
              <p className="text-[12px] text-gray-400 mb-0.5">{t("Total Work Hours")}</p>
            </div>
            <div>
              <p>{ attendance?.total_work_hours ?? "--:--" }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
