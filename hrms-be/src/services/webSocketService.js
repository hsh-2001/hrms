import { WebSocketServer } from "ws";
import { generateFakeTransaction, generateInitialData } from "../helpers/fakeTransactionHelper.js";

const getTransactions = () => {
  return generateInitialData();
};

const getTransactionById = (id) => {
  return generateFakeTransaction(id);
};

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.send(JSON.stringify({ type: "init", data: generateInitialData() }));

    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const newTx = generateFakeTransaction(Math.floor(Math.random() * 99));
        ws.send(JSON.stringify({ type: "new", data: newTx }));
      }
    }, 2000);

    ws.on("error", (err) => {
      console.error("WebSocket client error:", err.message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  wss.on("error", (err) => {
    console.error("WebSocket server error:", err.message);
  });

  console.log("WebSocket server is ready");
  return wss;
}

export default {
  getTransactions,
  getTransactionById,
};
