import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity'

@ObjectType()
export class LoginRegisterResponse {

    @Field()
    accessToken: string

    @Field()
    refreshToken: string

    @Field(() => User)
    user: User
}