import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
    throw new WsException('Invalid credential');
  }
}
