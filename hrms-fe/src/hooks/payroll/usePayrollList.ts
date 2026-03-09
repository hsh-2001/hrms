import { useState } from "react";
import type { IGetPayrollReportsResponse } from "../../types/payroll/payrollList";
import payrollApi from "../../lib/payrollApi";

export default function usePayrollList() {
  const [payrollList, setPayrollList] = useState<IGetPayrollReportsResponse[]>(
    [],
  );

  const getPayrollReports = async () => {
    try {
      const response = await payrollApi.getPayrollReports();
      if (response.isSuccess) {
        setPayrollList(response.data);
      }
    } catch (error) {
      console.error("Error fetching payroll reports:", error);
    }
  };

  return {
    payrollList,
    setPayrollList,
    getPayrollReports,
  };
}
