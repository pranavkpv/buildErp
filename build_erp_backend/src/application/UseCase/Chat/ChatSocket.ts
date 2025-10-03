import { Server, Socket } from 'socket.io';
import { IChatSocket } from '../../IUseCases/IChat/IChatSocket';
import { IChatSaveUseCase } from '../../IUseCases/IChat/IChatSave';
import { messageStatusConstant } from '../../../Shared/Constants/MessasageStatus.constant';
import { IChatMessageStatusUpateUseCase } from '../../IUseCases/IChat/IChatMessageStatusUpate';



export class ChatSocket implements IChatSocket {
    constructor(
        private _io: Server,
        private _chatSaveUseCase: IChatSaveUseCase,
        private _chatMessageStatusUpdate: IChatMessageStatusUpateUseCase,
    ) { }

    public init(): void {
        this._io.on('connection', (socket: Socket) => {
            console.log('User connected:', socket.id);

            socket.on('joinRoom', ({ senderId, receiverId }) => {
                const room = [senderId, receiverId].sort().join('_');
                socket.join(room);
            });

            socket.on('sendMessage', async({ senderId, receiverId, message }) => {
                const savedMessage = await this._chatSaveUseCase.execute({ senderId, receiverId, message, messageStatus: messageStatusConstant.SEND });
                const room = [senderId, receiverId].sort().join('_');
                this._io.to(room).emit('receiveMessage', savedMessage);
            });

            socket.on('messageDelivered', async({ messageId, senderId, receiverId }) => {
                const updateMessage = await this._chatMessageStatusUpdate.execute(messageId);
                const room = [senderId, receiverId].sort().join('_');
                this._io.to(room).emit('receiveMessage', updateMessage);
            });
            socket.on('userAddNotificationEventTrigger',async()=>{
                this._io.emit('addNotification')
            })

            socket.on('disconnect', () => {
                console.log(' User disconnected:', socket.id);
            });
        });
    }
}
