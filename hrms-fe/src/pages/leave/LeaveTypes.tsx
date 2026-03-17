import { useEffect, useRef } from "react";
import useLeave from "../../hooks/useLeave";
import BaseHeader from "../../components/shares/BaseHeader";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import usePermission from "../../hooks/usePermission";

const LeaveTypesPage = () => {
  const { leaveTypes, getLeaveTypes, getLeaveRemaining, leaveRemaining, user } = useLeave();
  const { isCreateable } = usePermission('leave/types');

  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      getLeaveTypes();
      if (user.user?.employee_id) {
        getLeaveRemaining();
      }
      isCalled.current = true;
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <BaseHeader headerTitle="Leave Types">
        {isCreateable && <PrimaryButton name="Add Leave Type" onClick={() => { }} />}
      </BaseHeader>
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {leaveTypes.map((type) => (
            <div
              key={type.id}
              className="p-4 sm:p-5 bg-gray-50 rounded-md hover:shadow-md hover:border-green-300 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h2 className="text-base sm:text-lg text-gray-800 font-semibold">{type.name}</h2>
                {
                  user.user?.employee_id ? (
                    <div className="bg-green-50 px-3 py-1.5 text-red-400 flex items-center justify-center rounded-full w-fit">
                      <span className="text-[10px] font-medium">
                        {leaveRemaining.find((leave) => leave.id === type.id)?.used_days || 0}/{type.total_per_year || 0}
                      </span>
                    </div>
                  ) :
                    <div className="bg-green-500/5 text-green-500">
                      <span className="text-sm">Total: {type.total_per_year || 0}</span>
                    </div>
                }
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{type.description}</p>
              <LeaveRemaingProgress
                usedDays={leaveRemaining.find((leave) => leave.id === type.id)?.used_days || 0}
                totalDays={type.total_per_year || 0}
              />
            </div>

          ))}

        </div>

        {leaveTypes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <span className="text-4xl mb-3">📋</span>
            <p className="font-medium">No leave types available</p>
            <p className="text-sm">Add a leave type to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveTypesPage;

const LeaveRemaingProgress = ({ usedDays, totalDays }: { usedDays: number; totalDays: number }) => {
  const percentage = totalDays > 0 ? Math.min((usedDays / totalDays) * 100, 100) : 0;

  return (
    <div className="w-full bg-green-500/10 rounded-full h-2.5">
      <div
        className="bg-red-500/50 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};