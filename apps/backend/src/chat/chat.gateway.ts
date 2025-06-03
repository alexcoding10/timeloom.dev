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

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private connectedUsers: ConnectedUser[] = [];
  private lostMessage: LostMessage[] = []

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
    if(userDisconected){
      //notifica usuarios conectados
      this.handlerNotificationUsersConected(userDisconected.companyId)
    }
    console.log('Cliente desconectado:', client.id);
  }

  handlerNotificationUsersConected(companyId: number) {
    // 🔁 Notificar a los usuarios de la misma empresa que alguien se ha conectado
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
    // Elimina duplicados si ya está conectado
    this.connectedUsers = this.connectedUsers.filter(user => user.userId !== data.userId);

    // Agrega el nuevo usuario
    this.connectedUsers.push({
      userId: data.userId,
      companyId: data.companyId,
      socketId: client.id
    });
    // 🔁 Notificar a los usuarios de la misma empresa que alguien se ha conectado
    this.handlerNotificationUsersConected(data.companyId)

    // 👉 Mensajes perdidos, verifico si hay  y lo envio 
    const messageLost = this.lostMessage.filter(message => message.to === data.userId)
    if (messageLost.length !== 0) {
      console.log('mensajes encontrados', messageLost)
      //significa que hay mensajes perdidos por lo que lo emito
      messageLost.forEach(msg => {
        this.server.to(client.id).emit('private_message', {
          from: msg.from,
          message: msg.message
        })
      })
      //eliminar de mensajes perdidos
      this.lostMessage = this.lostMessage.filter(
        lastMessage => lastMessage.to !== messageLost[0].to
      );

    }
    console.log(`Usuario registrado: ${data.userId} con socket ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
    console.log('Mensaje recibido:', payload);
    // Envía a todos los clientes, incluido el que envió el mensaje
    this.server.emit('message', payload);
  }

  @SubscribeMessage('private_message')
  handlePrivateMessage(@MessageBody() data: { toUserId: number, message: string }, @ConnectedSocket() client: Socket) {
    const fromUser = this.connectedUsers.find(user => user.socketId === client.id)
    const toUser = this.connectedUsers.find(user => user.userId === data.toUserId);
    if (toUser) {
      this.server.to(toUser.socketId).emit('private_message', {
        from: client.id,
        message: data.message,
      });
      console.log(`Mensaje privado enviado de ${client.id} a ${toUser.socketId}`);
    } else {
      //guardaria el mensaje en Mensajes perdidos
      console.log('Usuario destino no conectado');
      this.lostMessage.push({ from: fromUser?.userId || 0, message: data.message, to: data.toUserId });

      console.log('Mensajes perdidos ', this.lostMessage);
    }
  }
}
