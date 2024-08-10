import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { UserDTO, SignUpRequest, SignInRequest } from 'src/models/models';
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { promises } from 'dns';


@Injectable()
export class AuthService {
    constructor(
        private db: DatabaseService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(body: SignUpRequest) {

        try {
            let result = await this.db.user.create({
                data: {
                    uuid: uuidv4(),
                    name: body.name,
                    email: body.email,
                    passwordHash: await argon.hash(body.password),
                    createdAt: new Date()
                }
            })
    
            delete result.passwordHash
    
            console.log({result: result})
    
            return result
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials in use');
                }
            }

            throw error;
        }
    }

    async signin(body: SignInRequest) {

        const query = { where: { email: body.email } }
        let user = await this.db.user.findUnique(query)

        if (!user) {
            throw new ForbiddenException('Credentials incorrect')
        }

        const valid = argon.verify(user.passwordHash, body.password)


        if (!valid) {
            throw new ForbiddenException('Credentials incorrect')
        }

        delete user.passwordHash

        return {
            token: await this.signToken(user.uuid, user.email)
        }
    }

    async getRooms(uuid: string) {
        let rooms = []
        let results = await this.db.userOnRooms.findMany({
            where: {
                userUUID: uuid
            }
        })

        for (let result of results) {
            let room = await this.db.room.findUnique({
                where: {
                    uuid: result.roomUUID
                }
            })

            rooms.push(room)
        }

        return rooms
    }

    async leaveRoom(uuid: string, roomUUID: string) {

        let query = { where: { userUUID: uuid, roomUUID: roomUUID } }
        let results = await this.db.userOnRooms.deleteMany(query)

        return results
    }

    async signToken(userId: string,email: string): Promise<string> {
        const payload = { sub: userId, email }
        let secret = this.config.get('JWT_SECRET')
        console.log({secret: secret})
        console.log({t: this.config.get('DATABASE_URL')})
        return await this.jwt.signAsync(payload, {
            expiresIn: '60m', secret: secret
        })
    }

    async verifyToken(token: string): Promise<any> {
        return await this.jwt.verifyAsync(token)
    }
}
