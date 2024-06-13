import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
@ObjectType()
export class User {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  id: string

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string

  // @IsNotEmpty()
  // @IsString()
  // @Field()
  // password: string

}
