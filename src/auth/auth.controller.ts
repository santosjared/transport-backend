import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, UseGuards, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto:CreateAuthDto){
    console.log(createAuthDto)
    return await this.authService.validateUser(createAuthDto)
  }
  @Get()
  async findAll(@Req() req){
    if(req.headers.authorization){
      const [bearer , token] = req.headers.authorization.split(' ')
     return await this.authService.verifayToken(token?token:req.headers.authorization)
    }
    return await this.authService.verifayToken(req)
  }
}
