import { Length, IsEmail } from "class-validator";

export class SignInDto {
    @IsEmail()
    readonly email: string;

    @Length(5, 20)
    readonly password: string;
}