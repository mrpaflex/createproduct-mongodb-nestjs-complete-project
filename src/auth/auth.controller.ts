import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/user/dto/userlogin.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetRestApiCurrentUser } from 'src/common/customDecorators/restApi.decorator.guard';
import { User } from 'src/user/model/user.model';

@Controller('auth')
export class AuthController {
    constructor(private authServie: AuthService){}

    @Post('login')
    loginUser(@Body() login: UserLoginDTO){
        return this.authServie.loginUser(login)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async currentProfile(@GetRestApiCurrentUser() user: User){
        return user;
    }
}
