import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class ChatService {
    constructor(private readonly ws: WebsocketGateway) {}

    sendMessage(message: string) {
        this.ws.server.emit('chatMessage', message);
        this.ws.server.emit('message', message);
    }

}
