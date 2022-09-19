import { prop, Typegoose } from 'typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import Track from 'src/track/model/track.model';

export default class Playlist extends Typegoose {
  @ApiModelProperty()
  @prop()
  name: string;

  @ApiModelProperty()
  @prop()
  creator: string;

  @ApiModelProperty()
  @prop()
  playtime: string;

  @ApiModelProperty()
  @prop()
  trackList: Track[];
}