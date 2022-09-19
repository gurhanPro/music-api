import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export default class EditTrackDTO {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  album: string;

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  artist: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  duration: number;

  @ApiModelProperty()
  @IsUrl()
  @IsOptional()
  artworkUrl: string;

  @ApiModelProperty()
  @IsOptional()
  @IsUrl()
  audioUrl: string;
}
