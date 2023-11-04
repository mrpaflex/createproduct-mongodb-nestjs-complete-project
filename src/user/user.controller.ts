import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Post('create')
    async createuser(@Body() userinput: User){
        return await this.userService.createUser(userinput);
    }

    @Get('findall')
    findAlluser(){
        return this.userService.findall()
    }
}
