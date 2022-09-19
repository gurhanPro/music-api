import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import AuthService from 'src/auth/service/auth.service';
import Track from 'src/track/model/track.model';
import { PlaylistController } from './controller/playlist.controller';
import Playlist from './model/playlist.model';
import PlaylistService from './service/playlist.service';

@Module({
  imports: [ 
    TypegooseModule.forFeature(Playlist),
    TypegooseModule.forFeature(Track),
],
  controllers: [PlaylistController],
  providers: [PlaylistService,AuthService ],
})
export class PlaylistModule {}
