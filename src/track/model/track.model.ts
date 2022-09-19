import { prop, Typegoose } from 'typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

export default class Track extends Typegoose {
  @ApiModelProperty()
  @prop()
  name: string;

  @ApiModelProperty()
  @prop()
  album: string;

  @ApiModelProperty()
  @prop()
  artist: string;

  @ApiModelProperty()
  @prop()
  duration: number;

  @ApiModelProperty()
  @prop()
  artworkUrl: string;

  @ApiModelProperty()
  @prop()
  audioUrl: string;
}