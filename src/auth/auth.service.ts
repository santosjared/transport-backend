import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model, model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import getConfig from 'src/config/environment'
import { hasCompare, hashCrypto } from 'src/utils/crypto';
import { Users, UsersDocument } from 'src/users/schema/users.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
  @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private readonly jwtService: JwtService
  ) { }
  async create(createAuthDto: CreateAuthDto) {
    const { password } = createAuthDto
    createAuthDto.password = await hashCrypto(password)
    return await this.authModel.create(createAuthDto);
  }

  async findOne(email: string) {
    return await this.authModel.findOne({email});
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(email:string) {
    return await this.authModel.findOneAndUpdate({ email }, { delete: true }, { new: true })
  }

  async validateUser(createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;
      const emailUser = await this.authModel.findOne({ email, delete:false });
      if (!emailUser) return { menssage: 'EMAIL_INVALID', statusCode: HttpStatus.FORBIDDEN };
      const passhas = await hasCompare(password, emailUser.password);
      if (!passhas) return { menssage: 'PASSWORD_INVALID', statusCode: HttpStatus.FORBIDDEN };
      const user = await this.userModel.findOne({ email, delete: false }).populate({path:'rol', model:'Rol',populate:{path:'access',model:'Components'}}).exec();
      if (!user) return { menssage: 'USER_NOT_EXISTS', statusCode: HttpStatus.UNAUTHORIZED };
      return this.sesionToken(user);
    } catch {
    return { menssage: 'PASSWORD_INVALID', statusCode: HttpStatus.FORBIDDEN };
    }
  }
  private async sesionToken(user: any) {
     try {
      const payload = { id: user.id, _id:user._id,name:user.name, lastName: user.lastName, rol:user.rol?user.rol.name:null, access:user.rol?user.rol.access:null };
      return { token: this.jwtService.sign(payload), statusCode:HttpStatus.CREATED }
    } catch {
      return { menssage: 'ERROR_IN_GENERATE_TOKEN', statusCode: HttpStatus.UNAUTHORIZED }
    }
  }
  verifayToken(token: string) {
    try {
      const decode = jwt.verify(token, getConfig().token_Secret)
      return decode;
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}