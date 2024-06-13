import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {


  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string
  
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @Field()
  password: string


}
