import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { SignUpDto } from "src/dtos/SignUpDto";
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from "src/dtos/SignInDto";

export class AuthHelper{
    constructor(
        @InjectModel('User') private readonly User: Model<any>,
        private jwtService: JwtService
    ){}

    public async register(body: SignUpDto){
        const cripted = this.genHashPassword(body.password);

        const user = await new this.User({
            email: body.email,
            password: cripted.password,
            salt: cripted.salt
        }).save();

        const accessToken = this.jwtService.sign({ 
            userId: user._id 
        });

        return {
            _id: user._id,
            email: user.email,
            accessToken: accessToken
        };
    }

    public async login(body: SignInDto){
        const user = await this.User.findOne({
            email: body.email
        }).select('email password salt');

        const checked = this.comparePassword(
            user.password, 
            user.salt,
            body.password
        );

        if(!checked) 
            throw new Error('Invalid Password');

        const accessToken = this.jwtService.sign({ 
            userId: user._id 
        });

        return {
            _id: user._id,
            email: user.email,
            accessToken: accessToken
        };
    }

    private comparePassword(cripted, salt, value){
        return cripted == this.hashPassword(value, salt);
    }

    private genHashPassword(plainPassword) {
        const salt = crypto.randomBytes(16).toString('base64');
        const password = this.hashPassword(plainPassword, salt);
    
        return { salt, password };
    }

    private hashPassword(pass, salt){
        const base64 = new Buffer(salt, 'base64');
    
        return crypto
            .pbkdf2Sync(pass, base64, 10000, 64, 'sha1')
            .toString('base64');
    }

    public validatePassword(password, criptedPassword, salt){
        return criptedPassword == this.hashPassword(password, salt);
    }

}