import { useState } from "react";

interface INotification {
    id: number;
    title: string;
}

export default function useNotification() {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const addNotification = (title: string) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, title }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    };

    return {
        notifications,
        addNotification
    };
}