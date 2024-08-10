import {IsNotEmpty, IsEmail, IsString, IsUUID, isString} from 'class-validator'

export class SignUpRequest {

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class SignInRequest {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UserDTO {
    @IsString()
    uuid: string;

    @IsString()
    name: string;
    
    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    passwordHash: string;
    
    createdAt: Date;
    messages: any[];
    room: any[];

}

export class RoomDTO {
    @IsString()
    uuid: string;
    
    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    createdAt: Date;
    users: any[];
}

export class RoomRequest {

    @IsString()
    @IsUUID('4')
    userUUID: string;
    
    @IsString()
    title: string;
    
    @IsString()
    description: string;

}
  
export class UserOnRoomsDTO {
    
    @IsString()
    userUUID: string;    
    
    @IsString()
    roomUUID: string;
    
    user: UserDTO;
    assignedAt: Date;
    room: RoomDTO;
  
}

export class UserOnRoomsRequest {
    
    @IsString()
    @IsUUID('4')
    userUUID: string;

}
  
export class MessageDTO {
    @IsString()
    uuid: string;
    
    @IsString()
    content: string;
    
    @IsString()
    userUUID: string;
    
    createdAt: Date;
    user: UserDTO;
}
