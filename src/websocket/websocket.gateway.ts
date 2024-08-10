import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  MessageBody
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';



@WebSocketGateway({
  cors: { origin: '*'},
   namespace: '/chat'
})
export class WebsocketGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect {

    private logger = new Logger('WebsocketGateway');

    @WebSocketServer()
    server: Server;

    async afterInit(server: Server): Promise<void> {
      console.log('Websocket gateway initialized')
    }

    async handleConnection(client: Socket): Promise<void> {
      console.log(`Client ${client.id} joined room`);
      this.server.emit('client_connected', {
        id: client.id
      })
    }

    async handleDisconnect(client: Socket): Promise<void> {
      console.log(`Client ${client.id} left room`);
    }

    @SubscribeMessage('join_room')
    async handleSetClientDataEvent(client: Socket, payload: string) { 
      this.logger.log(`User is joining ${payload}`)
    }

    @SubscribeMessage('message')
    async handleChatMessage(client: Socket, payload: string): Promise<void> {
      this.logger.log(payload);

      this.server.emit('message', { client: client.id, payload: JSON.parse(payload) });
    }

}
