import { useEffect, useRef } from "react";
import useCompanyAccountList from "../../../hooks/useCompayAccountList";
import BaseHeader from "../../../components/shares/BaseHeader";
import PrimaryButton from "../../../components/shares/button/PrimaryButton";
import BaseDialog from "../../../components/shares/BaseDialog";
import MyInput from "../../../components/shares/input/MyInput";
import InfoButton from "../../../components/shares/button/InfoButton";

export default function CompanyList() {
  const {
    companyAccounts,
    getAllCompanyAccounts,
    model,
    setModel,
    isFormVisible,
    setIsFormVisible,
    handleCreateCompanyAccount,
  } = useCompanyAccountList();

  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      getAllCompanyAccounts();
      isCalled.current = true;
    }
  }, []);

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Company Accounts">
        <PrimaryButton
          name="Add Company"
          onClick={() => setIsFormVisible(!isFormVisible)}
        />
      </BaseHeader>
      <table className="w-full">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total Users</th>
            <th>Total Employees</th>
          </tr>
        </thead>
        <tbody>
          {companyAccounts.length ? (
            companyAccounts.map((company, index) => (
              <tr key={index}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
                <td>{company.address}</td>
                <td>{company.total_users}</td>
                <td>{company.total_employees}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No companies found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <BaseDialog
        isOpen={isFormVisible}
        isCentered
        title="Create Company Account"
        onClose={() => setIsFormVisible(false)}
      >
        <form onSubmit={handleCreateCompanyAccount} className="w-100 grid gap-2">
          <MyInput
            id="companyName"
            label="Company Name"
            required
            value={model.name}
            onChange={(e) => setModel({ ...model, name: e.target.value })}
          />
          <MyInput
            id="companyEmail"
            label="Company Email"
            value={model.email}
            onChange={(e) => setModel({ ...model, email: e.target.value })}
          />
          <MyInput
            id="companyPhone"
            label="Company Phone"
            value={model.phone}
            onChange={(e) => setModel({ ...model, phone: e.target.value })}
          />
          <MyInput
            id="companyAddress"
            label="Company Address"
            value={model.address}
            onChange={(e) => setModel({ ...model, address: e.target.value })}
          />
          <MyInput
            id="companyUsername"
            label="Login Username"
            required
            value={model.username}
            onChange={(e) => setModel({ ...model, username: e.target.value })}
          />
          <MyInput
            id="companyPassword"
            required
            label="Login Password"
            value={model.password}
            onChange={(e) => setModel({ ...model, password: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-2">
            <InfoButton name="Cancel" onClick={() => setIsFormVisible(false)} />
            <PrimaryButton name="Create" type="submit" />
          </div>
        </form>
      </BaseDialog>
    </div>
  );
}
