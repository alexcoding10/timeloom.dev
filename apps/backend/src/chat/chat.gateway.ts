import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ConnectedUser {
  userId: number,
  socketId: string,
  companyId: number
}

interface LostMessage {
  from: number,
  to: number,
  message: string
}

interface ChatMessage {
  fromUserId: number;
  toUserId: number;
  message: string;
  timestamp: number;
}

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://192.168.68.100:3000',
      'http://localhost:3030',
      'http://192.168.68.100:3030',
      'http://85.219.2.167',
      'http://timeloomapp.com'
    ],
    credentials: true,
    path: '/socket.io/', // importante: debe coincidir
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private connectedUsers: ConnectedUser[] = [];
  private lostMessage: LostMessage[] = []
  private messagesHistory: ChatMessage[] = [];

  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    const userDisconected = this.connectedUsers.find(
      user => user.socketId === client.id
    )
    this.connectedUsers = this.connectedUsers.filter(
      user => user.socketId !== client.id
    );
    if (userDisconected) {
      this.handlerNotificationUsersConected(userDisconected.companyId)
    }
    console.log('Cliente desconectado:', client.id);
  }

  handlerNotificationUsersConected(companyId: number) {
    const sameCompanyUsers = this.connectedUsers.filter(
      user => user.companyId === companyId
    );

    sameCompanyUsers.forEach(user => {
      this.server.to(user.socketId).emit('user_connected', {
        users: sameCompanyUsers
      });
    });
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: { userId: number, companyId: number }, @ConnectedSocket() client: Socket) {
    this.connectedUsers = this.connectedUsers.filter(user => user.userId !== data.userId);
    this.connectedUsers.push({
      userId: data.userId,
      companyId: data.companyId,
      socketId: client.id
    });
    this.handlerNotificationUsersConected(data.companyId)

    // Envío mensajes perdidos con estructura correcta
    const messageLost = this.lostMessage.filter(message => message.to === data.userId)
    if (messageLost.length !== 0) {
      console.log('mensajes encontrados', messageLost)
      messageLost.forEach(msg => {
        this.server.to(client.id).emit('private_message', {
          fromUserId: msg.from,
          toUserId: data.userId,
          message: msg.message,
          timestamp: Date.now(),
        })
      })
      this.lostMessage = this.lostMessage.filter(
        lastMessage => lastMessage.to !== data.userId
      );
    }
    console.log(`Usuario registrado: ${data.userId} con socket ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
    console.log('Mensaje recibido:', payload);
    this.server.emit('message', payload);
  }

  @SubscribeMessage('private_message')
  handlePrivateMessage(@MessageBody() data: { toUserId: number, message: string }, @ConnectedSocket() client: Socket) {
    const fromUser = this.connectedUsers.find(user => user.socketId === client.id)
    if (!fromUser) return

    const newMessage: ChatMessage = {
      fromUserId: fromUser.userId,
      toUserId: data.toUserId,
      message: data.message,
      timestamp: Date.now(),
    };

    this.messagesHistory.push(newMessage);

    const toUser = this.connectedUsers.find(user => user.userId === data.toUserId);
    if (toUser) {
      // Emitir mensaje al receptor con estructura completa
      this.server.to(toUser.socketId).emit('private_message', newMessage);
      console.log(`Mensaje privado enviado de ${client.id} a ${toUser.socketId}`);
    } else {
      this.lostMessage.push({ from: fromUser.userId, message: data.message, to: data.toUserId });
    }
  }

  @SubscribeMessage('get_history')
  handleGetHistory(@MessageBody() data: { withUserId: number }, @ConnectedSocket() client: Socket) {
    const fromUser = this.connectedUsers.find(user => user.socketId === client.id);
    if (!fromUser) return;

    const history = this.messagesHistory.filter(
      msg =>
        (msg.fromUserId === fromUser.userId && msg.toUserId === data.withUserId) ||
        (msg.fromUserId === data.withUserId && msg.toUserId === fromUser.userId)
    );

    this.server.to(client.id).emit('history', history);
  }
}
