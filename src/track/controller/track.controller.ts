import { Controller, Get, Post, Body, HttpCode,  HttpStatus, Param, Put, Delete, Query,
   } from '@nestjs/common';
import Track from 'src/track/model/track.model';
import TrackDTO from 'src/track/dto/track.dto';
import TrackService from '../service/track.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import EditTrackDTO from '../dto/edit-track.dto';
import AuthService from 'src/auth/service/auth.service';

@ApiUseTags('v1')
@Controller('tracks')
export class TrackController {
  constructor(
    private readonly trackService: TrackService, 
    private readonly authService: AuthService
    ) {}

  @Get("/")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
    isArray: true, 
    description: 'Returns all tracks.',
  })
  async getTracks(@Query('token') token: string): Promise<Track[]> {
    await this.authService.verify(token);
    return await this.trackService.getTracks();
  }

  @Get(':track_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
    description: 'get track by id',
  })
  async getTrack(
    @Param('track_id') trackId: string,
    @Query('token') token: string
  ): Promise<Track> {
    await this.authService.verify(token);
    return await this.trackService.getTrackById(trackId);
  }

  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Track,
    description: 'create track',
  })
  async createTrack(@Body() trackDTO: TrackDTO, @Query('token') token: string): Promise<Track> {
    await this.authService.verify(token);
    return await this.trackService.createTrack(trackDTO);
  }

  @Put(':track_id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: Track,
    description: 'edit track',
  })
  async editTrack(
    @Body() editTrackDTO: EditTrackDTO, 
    @Param('track_id') trackId: string,
    @Query('token') token: string
  ): Promise<Track> {
    await this.authService.verify(token);
    return await this.trackService.editTrack(editTrackDTO, trackId);
  }


  @Delete(':track_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
    description: 'delete track by id',
  })
  async deleteTrack(
    @Param('track_id') trackId: string,
    @Query('token') token: string
  ): Promise<string> {
    await this.authService.verify(token);
    return await this.trackService.deleteTrack(trackId);
  }
}
