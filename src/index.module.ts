import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppConfigs } from './configs/appConfigs';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypegooseModule.forRoot(AppConfigs.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    
    AuthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule {}
