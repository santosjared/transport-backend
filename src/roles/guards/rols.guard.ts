import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No se especifican roles, permitir acceso
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return false; // No hay token, denegar acceso
    }

    const decodedToken = this.jwtService.decode(token) as { id: string, _id: string, name: string, lastName: string, roles: string };

    if (!decodedToken || !decodedToken.roles) {
      return false; // Token inválido o sin roles, denegar acceso
    }

    return roles.some(role => decodedToken.roles.includes(role));
  }
}
