import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Playlist from 'src/playlist/model/playlist.model';
import { ModelType } from 'typegoose';
import EditPlaylistDTO from 'src/playlist/dto/edit-playlist.dto';
import Track from 'src/track/model/track.model';
import PlaylistDTO from '../dto/playlist.dto';
import AddTrackToPlaylistDTO from '../dto/playlistTrack.dto';

@Injectable()
export default class PlaylistService {
  constructor(
    @InjectModel(Track) private readonly trackModel: ModelType<Track>,
    @InjectModel(Playlist) private readonly playlistModel: ModelType<Playlist>,
  ) {}

  async getPlaylists(): Promise<Playlist[]> {
    return await this.playlistModel.find();
  }

  async createPlaylist(playlistDTO: PlaylistDTO): Promise<Playlist> {
    playlistDTO['playlists'] = [];
    const createdPlaylist = new this.playlistModel(playlistDTO);
    return await createdPlaylist.save();
  }

  async editPlaylist(playlistDTO: EditPlaylistDTO, playlistId: string): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if(!playlist){
      throw new NotFoundException(
        `Playlist with playlistId ${playlistId} could not be found`,
      );
    }
    this.updatePlaylist(playlistDTO, playlist);

    Logger.log('playlistId is : ', playlistId);
    return await new this.playlistModel(playlist).save()
  }



  private updatePlaylist(playlistDTO: EditPlaylistDTO, playlist) {
    if (playlistDTO.name) {
      playlist.name = playlistDTO.name;
    }

    if (playlistDTO.creator) {
      playlist.creator = playlistDTO.creator;
    }

    if (playlistDTO.playtime) {
      playlist.playtime = playlistDTO.playtime;
    }
  }

  async addTrack(addTrackDto: AddTrackToPlaylistDTO): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(addTrackDto.playlistId);
    if(!playlist){
      throw new NotFoundException(
        `Playlist with playlistId ${addTrackDto.playlistId} could not be found`,
      );
    }
    const track = await this.trackModel.findById(addTrackDto.trackId);
    if(!track){
      throw new NotFoundException(
        `track with trackId ${addTrackDto.trackId} could not be found`,
      );
    }

    for(let t of playlist.trackList){
      const existingTrackId = t['_id']
      if(existingTrackId.equals(addTrackDto.trackId)){
        throw new NotFoundException(
          `track already  ${addTrackDto.trackId} in playlist`,
        );
      }
    }
    playlist.trackList.push(track)
    return await new this.playlistModel(playlist).save()
  }

  async getPlaylistById(playlistId: string): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new NotFoundException(
        `Playlist with playlistId ${playlistId} could not be found`,
      );
    }
    return playlist;
  }

  async deletePlaylist(playlistId: string): Promise<any> {
    Logger.log('deleted playlist : ', playlistId);
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new NotFoundException(
        `Playlist with playlistId ${playlistId} could not be found`,
      );
    }
    await this.playlistModel.deleteOne(playlist);
    
    return { message: `Playlist with playlistId ${playlistId} is deleted` }
  }
}
