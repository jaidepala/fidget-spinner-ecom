import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CartModule } from './modules/cart/cart.module';
import { ProductsModule } from './modules/unauthorized/products.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [UsersService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CartModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
