import { useEffect } from "react";
import usePayrollList from "../../hooks/payroll/usePayrollList";

const PayrollListPage = () => {
    const {
        getPayrollReports,
        payrollList,
    } = usePayrollList();

    useEffect(() => {
        getPayrollReports();
    }, []);

    return (
        <div>
            <pre>
                Not DATA 
            </pre>
        </div>
    )
}

export default PayrollListPage;
