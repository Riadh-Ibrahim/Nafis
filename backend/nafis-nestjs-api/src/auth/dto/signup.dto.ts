/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreatePersonnelDto } from "src/personnels/dto/create-personnel.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import ErrorMessages from "src/utils/error-messages";

export class SignupDto {
    @IsNotEmpty({message: ErrorMessages.commonFieldsRequired})
    commonFields: CreateUserDto;

    @IsOptional()
    personnelSpecificFields: CreatePersonnelDto
        
    
}