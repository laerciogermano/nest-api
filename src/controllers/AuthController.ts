import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dtos/SignUpDto';
import { AuthHelper } from 'src/helper/AuthHelper';
import { SignInDto } from 'src/dtos/SignInDto';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private helper: AuthHelper
  ) {}


  @Post('/signup')
  async signUp(@Body() body: SignUpDto): Promise<any>{
    try{
      return await this.helper.register(body);
    }catch(e){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        code: '0000'
      }, 403);
    }
  }

  @Post('/signin')
  async signIn(@Body() body: SignInDto): Promise<any>{
    try{
      return await this.helper.login(body);
    }catch(e){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'This is a custom message',
        code: '0000'
      }, 403);
    }
  }

}
