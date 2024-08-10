import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { SubscribeMessage, WebSocketServer } from '@nestjs/websockets';


@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handlerMessage(client: any, payload: any): void {
        this.server.emit('message', payload);

        this.chatService.sendMessage('mensage')
    }
}
