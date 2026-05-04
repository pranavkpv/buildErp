import http from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";

import { createApp } from "./app";
import { connectMongo } from "./src/infrastructure/database/ConnectDB";

import { ChatRepository } from "./src/infrastructure/Repositories/Chat";
import { ChatSaveusecase } from "./src/application/UseCase/Chat/ChatSave";
import { ChatSocket } from "./src/application/UseCase/Chat/ChatSocket";
import { ChatMessageStatusUpdateUseCase } from "./src/application/UseCase/Chat/ChatMessageStatusUpadte";

import "./src/presentation/Cron/StageDeadlineJob";

dotenv.config();

// ✅ Create app
const app = createApp();

// ✅ Create server
const server = http.createServer(app);

// ✅ DB
const database = new connectMongo();
database.connectDb();

// ✅ Socket
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

const chatRepository = new ChatRepository();
const chatSaveUseCase = new ChatSaveusecase(chatRepository);
const chatMessageStatusUpdate = new ChatMessageStatusUpdateUseCase(chatRepository);

const chatSocket = new ChatSocket(
  io,
  chatSaveUseCase,
  chatMessageStatusUpdate
);

chatSocket.init();

// ✅ Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});