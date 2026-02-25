import { useEffect, useRef } from "react";
import usePosition from "../../hooks/usePosition";
import BaseHeader from "../../components/shares/BaseHeader";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import { Tag } from "antd";
import { Edit, Ellipsis } from "lucide-react";

const PositionsPage = () => {
  const { positions, getPositions } = usePosition();

  const isCalled = useRef(false);
  useEffect(() => {
    if (isCalled.current) return;
    isCalled.current = true;
    getPositions();
  }, []);

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Positions List">
        <PrimaryButton
          name="Add Position"
          onClick={() => alert("")}
        />
      </BaseHeader>
      {positions.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 max-h-[85%] px-2 overflow-y-auto">
          {positions.map((position, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 hover:border-green-200 rounded-[20px] flex justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center bg-green-500/10 rounded-[10px] w-12.5 h-12.5">
                  <span>{position.title.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-md flex gap-2 items-center">
                    {position.title}
                    <Tag color="green">
                      <span className="text-[10px]">
                        {position.code}
                      </span>
                    </Tag>
                  </div>
                  <div className="text-[12px] text-gray-500">Employee: 100</div>
                </div>
              </div>
              <div>
                <Tag color="blue" className="text-sm">
                  <span className="text-[12px]">
                    {position.is_active ? "Active" : "Inactive"}
                  </span>
                </Tag>
                <div className="flex p-2 gap-2 items-center">
                  <Edit className="text-gray-500 cursor-pointer" size={14} onClick={() => alert('testing')} />
                  <Ellipsis
                    className="text-gray-500 cursor-pointer"
                    size={14}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          No departments available
        </div>
      )}
    </div>
  );
};

export default PositionsPage;
