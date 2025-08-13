import { Server, Socket } from 'socket.io';
import { IChatSocketEntity } from '../../Entities/useCaseEntities/UserUseCaseEntities/ChatUseCaseEntities/ChatSocket';
import { IChatSaveUseCaseEntity } from '../../Entities/useCaseEntities/UserUseCaseEntities/ChatUseCaseEntities/ChatSaveUseCaseEntity';



export class ChatSocket implements IChatSocketEntity {
  private io: Server;
  private chatSaveUseCase : IChatSaveUseCaseEntity 
  constructor(io: Server,chatSaveUseCase : IChatSaveUseCaseEntity ) {
    this.io = io;
    this.chatSaveUseCase = chatSaveUseCase
  }

  public init(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("🟢 User connected:", socket.id);

      socket.on("joinRoom", ({ senderId, receiverId }) => {
        const room = [senderId, receiverId].sort().join("_");
        socket.join(room);
      });

      socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const savedMessage = await this.chatSaveUseCase.execute(senderId, receiverId, message );
        const room = [senderId, receiverId].sort().join("_");
        this.io.to(room).emit("receiveMessage", savedMessage);
      });

      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
      });
    });
  }
}
