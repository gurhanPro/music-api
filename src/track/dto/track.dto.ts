import { ApiModelProperty,  } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl } from 'class-validator';

export default class TrackDTO {
  init(name: string, album: string, artist: string, duration: number, artworkUrl: string, audioUrl: string){
    this.name = name;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
    this.artworkUrl = artworkUrl;
    this.audioUrl = audioUrl;
  }

  @ApiModelProperty()
  @IsString()
  name: string;

  @IsString()
  album: string;

  @ApiModelProperty()
  @IsString()
  artist: string;

  @ApiModelProperty()
  @IsNumber()
  duration: number;

  @ApiModelProperty()
  @IsUrl()
  artworkUrl: string;

  @ApiModelProperty()
  @IsUrl()
  audioUrl: string;
}
