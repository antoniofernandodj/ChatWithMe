import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './infra/database/database.module';
import { RoomModule } from './room/room.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvFile } from './config/init';


@Module({
  imports: [
    WebsocketModule,
    ConfigModule.forRoot({
      envFilePath: getEnvFile(),
      isGlobal: true,
    }),
    AuthModule,
    RoomModule,
    DatabaseModule
  ],
  controllers: [],
})
export class AppModule {}
