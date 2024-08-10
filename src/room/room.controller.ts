import { Body, Controller, Post, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRequest, UserOnRoomsRequest } from 'src/models/models';



@Controller('room')
export class RoomController {
    constructor(private service: RoomService) {}

    @Post()
    async createRoom(
        @Body() body: RoomRequest
    ) {
        return {
            result: await this.service.createRoom(body)
        }
    }

    @Post(':uuid/join')
    async joinRoom(
        @Param('uuid') uuid: string,
        @Body() body: UserOnRoomsRequest
    ) {
        return {
            result: await this.service.joinRoom({
                roomUUID: uuid,
                userUUID: body.userUUID
            })
        }
    }

    @Post(':uuid/leave')
    async leaveRoom(
        @Param('uuid') uuid: string,
        @Body() body: UserOnRoomsRequest
    ) {
  
        let result = await this.service.leaveRoom({
            roomUUID: uuid,
            userUUID: body.userUUID
        })

        let roomEmpty = await this.service.isRoomEmpty(uuid)

        if (roomEmpty) {
            await this.service.closeRoom(uuid);
        }

        return result
    }
}
