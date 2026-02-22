import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, IUser } from "../../types/auth";

const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const parseUser = (userStr: string | null): IUser | null => {
    if (!userStr || userStr === "undefined" || userStr === "null") {
        return null;
    }
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

const initialState: IAuthState = {
    user: parseUser(storedUser),
    token: token,
    isAuthenticated: !!token,
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCredentials: (
            state,
            action: PayloadAction<{ user: IUser; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

export const { setLoading, setCredentials, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
