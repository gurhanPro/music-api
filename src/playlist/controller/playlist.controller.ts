import { Controller, Get, Post, Body, HttpCode,  HttpStatus, Param, Put, Delete, Query,
   } from '@nestjs/common';
import Playlist from 'src/playlist/model/playlist.model';
import PlaylistDTO from 'src/playlist/dto/playlist.dto';
import PlaylistService from '../service/playlist.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import EditPlaylistDTO from '../dto/edit-playlist.dto';
import AuthService from 'src/auth/service/auth.service';
import AddTrackToPlaylistDTO from '../dto/playlistTrack.dto';

@ApiUseTags('v1')
@Controller('playlists')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService, 
    private readonly authService: AuthService
    ) {}

  @Get("/")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Playlist,
    isArray: true, 
    description: 'Returns all playlists.',
  })
  async getPlaylists(@Query('token') token: string): Promise<Playlist[]> {
    await this.authService.verify(token);
    return await this.playlistService.getPlaylists();
  }

  @Get(':playlist_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Playlist,
    description: 'get playlist by id',
  })
  async getPlaylist(
    @Param('playlist_id') playlistId: string,
    @Query('token') token: string
  ): Promise<Playlist> {
    await this.authService.verify(token);
    return await this.playlistService.getPlaylistById(playlistId);
  }

  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Playlist,
    description: 'create playlist',
  })
  async createPlaylist(@Body() playlistDTO: PlaylistDTO, @Query('token') token: string): Promise<Playlist> {
    await this.authService.verify(token);
    return await this.playlistService.createPlaylist(playlistDTO);
  }

  @Put(':playlist_id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: Playlist,
    description: 'edit playlist',
  })
  async editPlaylist(
    @Body() editPlaylistDTO: EditPlaylistDTO, 
    @Param('playlist_id') playlistId: string,
    @Query('token') token: string
  ): Promise<Playlist> {
    await this.authService.verify(token);
    return await this.playlistService.editPlaylist(editPlaylistDTO, playlistId);
  }


  @Post('/add-track')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: Playlist,
    description: 'add track to playlist',
  })
  async addTrack(
    @Body() addTrackDto: AddTrackToPlaylistDTO, 
    @Query('token') token: string
  ): Promise<Playlist> {
    await this.authService.verify(token);
    return await this.playlistService.addTrack(addTrackDto);
  }

  @Delete(':playlist_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Playlist,
    description: 'delete playlist by id',
  })
  async deletePlaylist(
    @Param('playlist_id') playlistId: string,
    @Query('token') token: string
  ): Promise<string> {
    await this.authService.verify(token);
    return await this.playlistService.deletePlaylist(playlistId);
  }
}
