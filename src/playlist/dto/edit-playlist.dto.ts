import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUrl, IsArray } from 'class-validator';

export default class EditPlaylistDTO {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  creator: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  playtime: string;

  @ApiModelProperty()
  @IsArray()
  @IsOptional()
  trackList: [];
}
