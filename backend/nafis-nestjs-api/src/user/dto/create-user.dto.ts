import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRoleEnum } from "src/enums/user-role.enum";
import ErrorMessages from "src/utils/error-messages";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: ErrorMessages.firstnameIsRequired })
    firstname: string;
    
    @IsString()
    @IsNotEmpty({ message: ErrorMessages.lasttnameIsRequired })
    lastname: string;
    
    @IsEmail({}, { message: ErrorMessages.invalidEmail })
    @IsNotEmpty({ message: ErrorMessages.emailRequired })
    email: string;
    
    @IsString()
    @MinLength(6, { message: ErrorMessages.invalidLengthPassword })
    @IsNotEmpty({ message: ErrorMessages.passwordRequired })
    password: string;
    
    @IsEnum(UserRoleEnum, { message: ErrorMessages.invalidRole})
    role: UserRoleEnum;
}
