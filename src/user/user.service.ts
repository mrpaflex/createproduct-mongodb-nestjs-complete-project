import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashed } from 'src/auth/hashed/util.hashed';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(input: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: input.email }).exec();
        if (existingUser) {
            throw new HttpException('user with same information already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const hashedPassword = await hashed(input.password);
        input.password = hashedPassword
        const newUser = new this.userModel(input);
         delete newUser.password;
        return newUser.save();
    }

    async findall(){
        const user =  await this.userModel.find().lean()
        
        return user
    }
}
