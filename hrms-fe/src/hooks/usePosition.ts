import { useState } from "react";
import type { IGetPositionsResponse } from "../types/position";
import positionApi from "../lib/positionApi";

export default function usePosition() {
  const [positions, setPositions] = useState<IGetPositionsResponse[]>([]);

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

  return {
    positions,
    getPositions,
  };
}
