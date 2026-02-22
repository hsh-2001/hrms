import { useState } from "react";
import type { ICreateCompanyAccountRequest, IGetCompanyAccountResponse } from "../types/company";
import rootApi from "../lib/rootApi";

export default function useCompanyAccountList() {
    const [companyAccounts, setCompanyAccounts] = useState<IGetCompanyAccountResponse[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
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
    
    return {
        companyAccounts,
        getAllCompanyAccounts,
        isFormVisible,
        setIsFormVisible,
        model,
        setModel,
        handleCreateCompanyAccount,
    }
}