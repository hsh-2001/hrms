import api from "./api";
import { getResponse, type BaseResponse } from "./baseReponse";

export interface Transaction {
    id: number;
    datetime: string;
    type: string;
    user: string;
    amount: number;
}

export interface WsMessage {
    type: "init" | "new";
    data: Transaction[] | Transaction;
}

const getAllTransactions = async (): Promise<BaseResponse<Transaction[]>> => {
    const result = await api.get("/transaction");
    return getResponse(result.data);
};

const getWsUrl = (): string => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
    return baseUrl.replace(/\/api$/, "").replace(/^http/, "ws");
};

const connectWebSocket = (onMessage: (msg: WsMessage) => void): WebSocket => {
    const ws = new WebSocket(getWsUrl());

    ws.onopen = () => {
        console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
        const msg: WsMessage = JSON.parse(event.data);
        onMessage(msg);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.log("WebSocket disconnected");
    };

    return ws;
};

export default {
    getAllTransactions,
    connectWebSocket,
};