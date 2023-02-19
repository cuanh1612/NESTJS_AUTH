import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    return body;
  }
}
