import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './Auth/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://mernproject:mernproject@cluster0.7yv4a.mongodb.net/mernproject?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'register', method: RequestMethod.ALL });
  }
}
