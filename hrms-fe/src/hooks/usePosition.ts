import { useRef, useState } from "react";
import type { ICreatePositionRequest, IGetPositionsResponse } from "../types/position";
import positionApi from "../lib/positionApi";

export default function usePosition() {
  const [positions, setPositions] = useState<IGetPositionsResponse[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const positionId = useRef(0);
  const [model, setModel] = useState<ICreatePositionRequest>({
    title: "",
    code: "",
    description: "",
    is_active: true,
    company_id: 0,
    department_id: 0,
  });

  const getPositions = async () => {
    try {
      const response = await positionApi.getAllPositions();
      if (response.isSuccess) {
        setPositions(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    }
  };

  const handleSubmitPosition = async () => {
    try {
      if (isEditing) {
        const response = await positionApi.updatePosition(positionId.current, model);
        if (response.isSuccess) {
          setDialogVisible(false);
          setIsEditing(false);
          getPositions();
        }
      } else {
        const response = await positionApi.createPosition(model);
        if (response.isSuccess) {
          setDialogVisible(false);
          getPositions();
        }
      }
    } catch (error) {
      console.error("Failed to create or update position:", error);
    }
  };

  const onClickEdit = (position: IGetPositionsResponse) => {
    setIsEditing(true);
    positionId.current = position.id;
    setModel({
      title: position.title,
      code: position.code,
      description: position.description,
      is_active: position.is_active,
      company_id: position.company_id,
      department_id: position.department_id,
    });
    setDialogVisible(true);
  };

  return {
    positions,
    getPositions,
    dialogVisible,
    setDialogVisible,
    model,
    setModel,
    handleSubmitPosition,
    onClickEdit,
    isEditing,
  };
}
