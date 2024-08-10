import { Controller, Post, Get, Req, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDTO, SignUpRequest, SignInRequest } from 'src/models/models';


@Controller('auth')
export class AuthController {

  constructor(private auth: AuthService) {}
  
    @Post('signup')
    async signUp(
      @Body() signupData: SignUpRequest
    ) {
      return {
        result: await this.auth.signup(signupData),
      }
    }

    @Post('signin')
    async signIn(
      @Body() signupData: SignInRequest
    ) {
      try {
        const user = await this.auth.signin(signupData)
  
        return {
          msg: 'Successfull logged in!',
          data: user
        }
      } catch(e) {
        return {
          msg: `${e}`
        }
      }
    }

    @Get(':uuid/rooms')
    async getRooms(
      @Param('uuid')
      uuid: string
    ) {
      return {
        results: {
          rooms: await this.auth.getRooms(uuid)
        }
      }
    }

    @Delete(':uuid/rooms/:roomUUID')
    async leaveRoom(
      @Param('uuid')
      uuid: string,

      @Param('roomUUID')
      roomUUID: string
    ) {
      return {
        results: await this.auth.leaveRoom(uuid, roomUUID)
      }
    }
}

