import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginDTO } from 'src/user/dto/userlogin.dto';
import { User } from 'src/user/model/user.model';
import { comparePassword } from './hashed/util.hashed';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
    ) {}

    async loginUser(login: UserLoginDTO) {
       const user = await this.userModel.findOne({
        email: login.email
       })

       if (!user) {
        throw new HttpException('wrong login detail', HttpStatus.NOT_FOUND)
       }
    
       if(await comparePassword(login.password, user.password)===false){
        throw new HttpException('your password is incorrect', HttpStatus.UNPROCESSABLE_ENTITY)
    }

        const payload ={
             user
        }
            return {
                accesstoken: this.jwtService.sign(payload)
            }
    }

    async getUserjwt(id: string){
        const user = await this.userModel.findOne({_id: id}).exec();
       
        return user;
       }
}
