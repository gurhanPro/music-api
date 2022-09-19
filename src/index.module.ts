import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppConfigs } from './configs/appConfigs';
import { TrackModule } from 'src/track/track.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypegooseModule.forRoot(AppConfigs.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    
    CacheModule.register({
      // store: redisStore,
      // host: AppConfigs.REDIS_HOST,
      // port: AppConfigs.REDIS_PORT,
    }),
    TrackModule,
    PlaylistModule,
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
