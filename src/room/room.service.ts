import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { RoomRequest } from 'src/models/models';
import { v4 as uuidv4} from 'uuid'


@Injectable()
export class RoomService {

    constructor(private db: DatabaseService) {}

    async createRoom(body: RoomRequest) {
        let result = await this.db.room.create({
            data: {
                uuid: uuidv4(),
                title: body.title,
                description: body.description,
                createdAt: new Date()
            }
        })

        if (result) {
            await this.joinRoom({
                roomUUID: result.uuid, userUUID: body.userUUID
            })
        }

        return result
    }

    async joinRoom(body: {
        roomUUID: string,
        userUUID: string
    }) {
        return await this.db.userOnRooms.create({
            data: {
                userUUID: body.userUUID,
                roomUUID: body.roomUUID,
                assignedAt: new Date(),
            }
        })
    }

    async leaveRoom(body: {
        roomUUID: string,
        userUUID: string
    }) {
        return await this.db.userOnRooms.deleteMany({
            where: {
                userUUID: body.userUUID,
                roomUUID: body.roomUUID
            }
        });
    }

    async closeRoom(roomUUID: string) {
        let query = { where: { uuid: roomUUID } }
        return await this.db.room.deleteMany(query);
    }

    async isRoomEmpty(roomUUID: string): Promise<boolean> {
        let query = { where: { roomUUID: roomUUID } }
        const usersInRoom = await this.db.userOnRooms.findMany(query);
        return usersInRoom.length === 0;
    }
}
