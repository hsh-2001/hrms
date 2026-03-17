import { useState, useRef, useEffect } from "react";

export default function useMessage() {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const queueRef = useRef<string[]>([]);
    const isProcessingRef = useRef(false);

    const processQueue = (delay: number) => {
        if (isProcessingRef.current) return;

        isProcessingRef.current = true;

        const run = () => {
            if (queueRef.current.length === 0) {
                isProcessingRef.current = false;
                return;
            }

            setTimeout(() => {
                queueRef.current.shift();
                setMessages([...queueRef.current]);
                run();
            }, delay);
        };

        run();
    };

    const addMessages = (message: string, delay = 2000) => {
        queueRef.current.push(message);
        setMessages([...queueRef.current]);

        processQueue(delay);
    };

    const clearMessages = () => {
        queueRef.current = [];
        setMessages([]);
        isProcessingRef.current = false;
    };

    useEffect(() => {
        return () => {
            queueRef.current = [];
        };
    }, []);

    const addOneMessage = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }

    return {
        messages,
        addMessages,
        clearMessages,
        message,
        addOneMessage,
    };
}