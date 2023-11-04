import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService)=>({
        uri: configService.get('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    UserModule, ProductModule, AuthModule],
})
export class AppModule {}
