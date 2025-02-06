/* eslint-disable prettier/prettier */
import { 
    CanActivate, 
    ExecutionContext, 
    Injectable, 
    UnauthorizedException 
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Request } from "express";

@Injectable()
export class RoleAccessControlGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);

        if (!token) {
            throw new UnauthorizedException('You must log in or sign up first.');
          }
        try {
            const payload = await this.jwtService.verifyAsync(token, 
                {
                secret: process.env.JWT_SECRET,
                }
            );
            request['user'] = payload;
            const requiredRoles = this.getRequiredRoles(context);

            if (!requiredRoles.includes(payload.role)) {
                throw new UnauthorizedException("You do not have access to this resource");

            }
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private getRequiredRoles(context: ExecutionContext): UserRoleEnum[] {
        const routeRoles = context.getHandler()?.['roles'] ?? [];
        const classRoles = context.getClass()?.['roles'] ?? [];
        return [...routeRoles, ...classRoles]
    }

    extractTokenFromRequest(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ');
        return type === "Bearer" ? token : undefined;
    }
}