import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/strategy.jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
//import { ConfigService } from '@nestjs/config';

require('dotenv').config();
@Module({
  imports: [
    
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory:async (configService:ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '2hr'}
      }),
      inject: [ConfigService],
    }), 
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService, JwtAuthGuard]
})
export class AuthModule {}
