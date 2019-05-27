import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/UserSchema';
import { AuthStrategy } from './AuthStrategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from './constants/Config';
import { AuthController } from './controllers/AuthController';
import { AuthHelper } from './helper/AuthHelper';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: Config.SECRET_KEY,
      signOptions: {
        expiresIn: Config.EXPIRES_IN,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot(Config.MONGO_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthStrategy, 
    AuthHelper,
  ],
})
export class AppModule {}
