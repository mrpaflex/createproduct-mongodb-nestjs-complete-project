import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { StatusController } from './status.controller';

@Module({

  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UserController, StatusController],
  providers: [UserService]
})
export class UserModule {}
