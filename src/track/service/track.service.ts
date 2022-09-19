import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Track from 'src/track/model/track.model';
import { ModelType } from 'typegoose';
import TrackDTO from 'src/track/dto/track.dto';
import EditTrackDTO from 'src/track/dto/edit-track.dto';

@Injectable()
export default class TrackService {
  constructor(
    @InjectModel(Track) private readonly trackModel: ModelType<Track>,
  ) {}

  async getTracks(): Promise<Track[]> {
    console.log('on gracks');
    
    return await this.trackModel.find();
  }

  async createTrack(trackDTO: TrackDTO): Promise<Track> {
    trackDTO['tracks'] = [];
    const createdTrack = new this.trackModel(trackDTO);
    return await createdTrack.save();
  }

  async editTrack(trackDTO: EditTrackDTO, trackId: string): Promise<Track> {
    const track = await this.trackModel.findById(trackId);
    if(!track){
      throw new NotFoundException(
        `Track with trackId ${trackId} could not be found`,
      );
    }
    this.updateTrack(trackDTO, track);

    Logger.log('trackId is : ', trackId);
    return await new this.trackModel(track).save()
  }

  private updateTrack(trackDTO: EditTrackDTO, track) {
    if (trackDTO.name) {
      track.name = trackDTO.name;
    }

    if (trackDTO.album) {
      track.album = trackDTO.album;
    }

    if (trackDTO.artist) {
      track.artist = trackDTO.artist;
    }

    if (trackDTO.duration) {
      track.duration = trackDTO.duration;
    }

    if (trackDTO.artworkUrl) {
      track.artworkUrl = trackDTO.artworkUrl;
    }

    if (trackDTO.audioUrl) {
      track.audioUrl = trackDTO.audioUrl;
    }
  }

  async getTrackById(trackId: string): Promise<Track> {
    const track = await this.trackModel.findById(trackId);
    if (!track) {
      throw new NotFoundException(
        `Track with trackId ${trackId} could not be found`,
      );
    }
    return track;
  }

  async deleteTrack(trackId: string): Promise<any> {
    Logger.log('deleted track : ', trackId);
    const track = await this.trackModel.findById(trackId);
    if (!track) {
      throw new NotFoundException(
        `Track with trackId ${trackId} could not be found`,
      );
    }
    await this.trackModel.deleteOne(track);
    
    return { message: `Track with trackId ${trackId} is deleted` }
  }
}
