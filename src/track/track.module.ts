import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import AuthService from 'src/auth/service/auth.service';
import { TrackController } from './controller/track.controller';
import Track from './model/track.model';
import TrackService from './service/track.service';

@Module({
  imports: [ 
    TypegooseModule.forFeature(Track),
],
  controllers: [TrackController],
  providers: [TrackService,AuthService ],
})
export class TrackModule {}
