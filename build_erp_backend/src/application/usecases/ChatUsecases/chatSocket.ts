import { Server, Socket } from 'socket.io';
import { IChatSocket } from '../../interfaces/UserUseCaseEntities/ChatUseCaseEntities/ChatSocket';
import { IChatSaveUseCase } from '../../interfaces/UserUseCaseEntities/ChatUseCaseEntities/ChatSaveUseCaseEntity';



export class ChatSocket implements IChatSocket {
  constructor(
    private _io: Server,
    private _chatSaveUseCase: IChatSaveUseCase
  ) { }

  public init(): void {
    this._io.on("connection", (socket: Socket) => {
      console.log("🟢 User connected:", socket.id);

      socket.on("joinRoom", ({ senderId, receiverId }) => {
        const room = [senderId, receiverId].sort().join("_");
        socket.join(room);
      });

      socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const savedMessage = await this._chatSaveUseCase.execute({senderId, receiverId, message});
        const room = [senderId, receiverId].sort().join("_");
        this._io.to(room).emit("receiveMessage", savedMessage);
      });

      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
      });
    });
  }
}
