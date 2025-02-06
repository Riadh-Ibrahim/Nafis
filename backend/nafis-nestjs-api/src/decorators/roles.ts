/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { UserRoleEnum } from "src/enums/user-role.enum";

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);