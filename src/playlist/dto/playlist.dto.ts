import { ApiModelProperty,  } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl, IsArray } from 'class-validator';

export default class PlaylistDTO {
  @ApiModelProperty()
  @IsString()
  name: string;

  @IsString()
  creator: string;

  @ApiModelProperty()
  @IsNumber()
  playtime: number;

  @ApiModelProperty()
  @IsArray()
  trackList: [];
}