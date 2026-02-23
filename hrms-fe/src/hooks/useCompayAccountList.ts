import { useState } from "react";
import type { ICreateCompanyAccountRequest, IGetCompanyAccountResponse } from "../types/company";
import rootApi from "../lib/rootApi";

export default function useCompanyAccountList() {
    const [companyAccounts, setCompanyAccounts] = useState<IGetCompanyAccountResponse[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [model, setModel] = useState<ICreateCompanyAccountRequest >({
        username: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
    });

    const getAllCompanyAccounts = async () => {
        const response = await rootApi.getAllCompanies();
        setCompanyAccounts(response.data);
    }

    const handleCreateCompanyAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await rootApi.createCompanyAccount(model);
            if (response.status === 200) {
                await getAllCompanyAccounts();
                setIsFormVisible(false);
            }
        } catch (error) {
            console.error("Failed to create company account:", error);
        }
    }

    const onClickEdit = (company: IGetCompanyAccountResponse) => {
        setIsEditMode(true);
        setIsFormVisible(true);
        setModel(() => company as unknown as ICreateCompanyAccountRequest);
    }

    const handleEditCompanyAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!model.id) return;
        try {
            const response = await rootApi.editCompanyAccount(model.id, model);
            if (response.isSuccess) {
                await getAllCompanyAccounts();
                setIsFormVisible(false);
                setIsEditMode(false);
            }
        } catch (error) {
            console.error("Failed to edit company account:", error);
        }
    }
    
    return {
        companyAccounts,
        getAllCompanyAccounts,
        isFormVisible,
        setIsFormVisible,
        model,
        setModel,
        handleCreateCompanyAccount,
        onClickEdit,
        isEditMode,
        handleEditCompanyAccount,
    };
}