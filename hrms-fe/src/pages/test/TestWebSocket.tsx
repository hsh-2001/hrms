import { useEffect, useState } from "react";
import webSocketApi, { type Transaction } from "../../lib/webSocketApi";

function maskUser(user: string): string {
    if (user.length <= 7) return user.slice(0, 2) + "*****" + user.slice(-2);
    return user.slice(0, 2) + "*****" + user.slice(-2);
}

function formatDatetime(datetime: string): string {
    const d = new Date(datetime);
    const date = d.toISOString().slice(0, 10);
    const time = d.toTimeString().slice(0, 5);
    return `${date}  ${time}`;
}

export default function TestWebSocket() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await webSocketApi.getAllTransactions();
                if (response.isSuccess) {
                    setTransactions(response.data);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchData();

        const ws = webSocketApi.connectWebSocket((msg) => {
            if (msg.type === "init") {
                setTransactions(msg.data as Transaction[]);
            } else if (msg.type === "new") {
                setTransactions((prev) => {
                    const updated = [msg.data as Transaction, ...prev];
                    return updated.slice(0, prev.length || updated.length);
                });
            }
        });

        ws.addEventListener("open", () => setConnected(true));
        ws.addEventListener("close", () => setConnected(false));

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0d0f1a] flex items-start justify-center p-4 pt-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-white text-xl font-bold tracking-[0.3em] uppercase">
                        <span className="mr-2">♛</span>
                        Winner - Board
                        <span className="ml-2">🏆</span>
                    </h2>
                    {!connected && (
                        <p className="text-gray-500 text-xs mt-1">Disconnected</p>
                    )}
                </div>

                {/* Board */}
                <div className="rounded-xl border-2 border-[#4a3aff] bg-[#131525] overflow-hidden">
                    <div className="divide-y divide-[#1e2040]">
                        {transactions.map((tx, index) => (
                            <div
                                key={`${tx.id}-${tx.datetime}`}
                                className={`flex items-center justify-between px-5 py-3.5 transition-colors ${
                                    index % 2 === 0
                                        ? "bg-[#131525]"
                                        : "bg-[#161836]"
                                }`}
                            >
                                <span className="text-gray-300 text-sm font-mono">
                                    {formatDatetime(tx.datetime)}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 text-sm">
                                        {maskUser(tx.user)}
                                    </span>
                                    <span className="text-green-400 text-sm font-semibold">
                                        + ${tx.amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {transactions.length === 0 && (
                        <div className="text-center text-gray-500 py-10 text-sm">
                            No transactions yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
