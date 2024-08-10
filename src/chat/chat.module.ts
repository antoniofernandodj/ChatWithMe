import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Module({
    controllers: [ChatController],
    providers: [ChatService, WebsocketGateway],
})
export class ChatModule {}