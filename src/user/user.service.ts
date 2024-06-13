import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }
  
  async createUser(createUserInput: CreateUserInput): Promise<any> {
    
    const newUser: Prisma.UserCreateInput = {
      name: createUserInput.name,
      email: createUserInput.email,
      password: await Bcrypt.hash(createUserInput.password, 10)
    }

    const IsUserRegistered = await this.databaseService.user.findFirst({
      where: {
        email: createUserInput.email
      }
    })

    if (IsUserRegistered) {
      throw new ConflictException("We have an existing seller registered with this email", {
        cause: new Error(),
        description: "email not unique"
      })
    }

    const registerUser = await this.databaseService.user.create({ data: newUser });

    if (!registerUser) {
      throw new InternalServerErrorException("Internal server error! Seller registration failed", {
        cause: new Error(),
        description: "server error"
      })
    }

    const userTokens = this.createTokens(registerUser.id, registerUser.email);

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async createTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign({
      userId: userId,
      email: email
    });

    const refreshToken = this.jwtService.sign({
      userId: userId,
      email: email,
      accessToken
    },
      {
        expiresIn:this.configService.get('JWT_EXPIRES'),
        secret: this.configService.get('JWT_SECRET')
      })

    return { accessToken, refreshToken }
  }
}
