import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import ErrorMessages from "src/utils/error-messages";

export class LoginDto {
    @IsEmail({}, { message: ErrorMessages.invalidEmail })
    @IsNotEmpty({ message: ErrorMessages.emailRequired })
    email: string;

    @IsString()
    @MinLength(6, { message: ErrorMessages.invalidLengthPassword })
    @IsNotEmpty({ message: ErrorMessages.passwordRequired })
    @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/, {
        message:ErrorMessages.invalidPassword,
    })
    password: string;
}