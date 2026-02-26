import { useEffect, useRef } from "react";
import useCompanyAccountList from "../../../hooks/useCompayAccountList";
import BaseHeader from "../../../components/shares/BaseHeader";
import PrimaryButton from "../../../components/shares/button/PrimaryButton";
import BaseDialog from "../../../components/shares/BaseDialog";
import MyInput from "../../../components/shares/input/MyInput";
import InfoButton from "../../../components/shares/button/InfoButton";
import { Edit } from "lucide-react";
import useDevice from "../../../hooks/useDevice";

export default function CompanyList() {
  const {
    companyAccounts,
    getAllCompanyAccounts,
    model,
    setModel,
    isFormVisible,
    setIsFormVisible,
    handleCreateCompanyAccount,
    isEditMode,
    onClickEdit,
    handleEditCompanyAccount,
  } = useCompanyAccountList();
  const { isMobile } = useDevice();

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
      <div className="max-w-screen px-2 overflow-x-auto">
        <table className="w-full min-w-250">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Login Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total Users</th>
              <th>Total Employees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companyAccounts.length ? (
              companyAccounts.map((company, index) => (
                <tr key={index}>
                  <td>{company.name}</td>
                  <td>{company.login_name}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                  <td>{company.address}</td>
                  <td>{company.total_users}</td>
                  <td>{company.total_employees}</td>
                  <td align="center">
                    <Edit
                      size={14}
                      className="text-gray-500 cursor-pointer"
                      onClick={() => onClickEdit(company)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No companies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <BaseDialog
        isOpen={isFormVisible}
        isCentered
        title={isEditMode ? "Edit Company Account" : "Create Company Account"}
        onClose={() => setIsFormVisible(false)}
      >
        <form
          onSubmit={
            isEditMode ? handleEditCompanyAccount : handleCreateCompanyAccount
          }
          className={`grid gap-2 ${isMobile ? "px-2 w-76.5" : "w-100"}`}
        >
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
            required={!isEditMode}
            value={model.username}
            disabled={isEditMode}
            onChange={(e) => setModel({ ...model, username: e.target.value })}
          />
          <MyInput
            id="companyPassword"
            required={!isEditMode}
            label="Login Password"
            value={model.password}
            disabled={isEditMode}
            onChange={(e) => setModel({ ...model, password: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-2">
            <InfoButton name="Cancel" onClick={() => setIsFormVisible(false)} />
            <PrimaryButton
              name={isEditMode ? "Update" : "Create"}
              type="submit"
            />
          </div>
        </form>
      </BaseDialog>
    </div>
  );
}
