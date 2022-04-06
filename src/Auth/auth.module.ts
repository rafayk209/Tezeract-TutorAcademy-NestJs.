import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authController } from './auth.controller';
import { authService } from './auth.service';
import { registerSchema } from './auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Register', schema: registerSchema }]),
  ],
  controllers: [authController],
  providers: [authService],
})
export class AuthModule {}
