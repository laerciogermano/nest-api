import { Length, IsEmail, Validate } from "class-validator";
import { IsEqualsPassword } from "../validators/IsEqualsPassword";

export class SignUpDto {
    @IsEmail()
    readonly email: string;

    @Length(5, 20)
    readonly password: string;

    @Validate(IsEqualsPassword)
    readonly confirmPassword: string;

}