import { useState } from "react";

interface INotification {
    id: number;
    title: string;
    message?: string;
    type?: "success" | "error" | "warning" | "info";
}

export default function useNotification() {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const addNotification = (
        title: string,
        options?: {
            message?: string;
            type?: "success" | "error" | "warning" | "info";
            duration?: number;
        }
    ) => {
        const id = Date.now();
        const newNotification: INotification = {
            id,
            title,
            message: options?.message,
            type: options?.type || "info",
        };
        
        setNotifications((prev) => [...prev, newNotification]);
        
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, options?.duration || 3000);
    };

    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return {
        notifications,
        addNotification,
        removeNotification,
    };
}