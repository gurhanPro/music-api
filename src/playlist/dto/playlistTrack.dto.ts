import { ApiModelProperty,  } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export default class AddTrackToPlaylistDTO {
  @ApiModelProperty()
  @IsMongoId()
  playlistId: string;

  @ApiModelProperty()
  @IsMongoId()
  trackId: string;
}