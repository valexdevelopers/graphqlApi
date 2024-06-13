import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseService } from 'src/database/database.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    })
  ],
  providers: [UserResolver, UserService, DatabaseService, JwtService],
})
export class UserModule {}
