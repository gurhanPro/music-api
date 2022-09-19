import { Controller, Get, Post, Body, HttpCode,  HttpStatus, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import AuthService from '../service/auth.service';

@ApiUseTags('v1')
@Controller('auth')
export class AuthController {
  constructor(private readonly trackService: AuthService) {}

  @Get("/token")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns api token.',
  })
  async getToken(): Promise<string> {
    return await this.trackService.getToken();
  }

}
