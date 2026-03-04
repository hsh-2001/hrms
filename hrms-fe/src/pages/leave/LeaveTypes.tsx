import { useEffect, useRef } from "react";
import useLeave from "../../hooks/useLeave";
import BaseHeader from "../../components/shares/BaseHeader";
import PrimaryButton from "../../components/shares/button/PrimaryButton";

const LeaveTypesPage = () => {
  const { leaveTypes, getLeaveTypes } = useLeave();

  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      getLeaveTypes();
      isCalled.current = true;
    }
  }, []);

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Leave Types">
        <PrimaryButton name="Add Leave Type" onClick={() => {}} />
      </BaseHeader>
      <div className="px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {leaveTypes.map((type) => (
            <div key={type.id} className={`grid p-6 bg-black/5 rounded-2xl border border-transparent hover:border hover:border-green-300`}>
             <div className="flex justify-between">
               <h2 className="text-md text-green-800 font-medium">{type.name}</h2>
               <div className="bg-test-500 w-auto px-4 h-8 text-green-500 flex items-center justify-center rounded-md">
                <span className="text-sm">Remaining: 10</span>
               </div>
             </div>
              <p className=" text-gray-500 text-sm">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveTypesPage;
