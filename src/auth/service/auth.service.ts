var jwt = require('jsonwebtoken');
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigs } from 'src/configs/appConfigs';

@Injectable()
export default class AuthService {
  
  async getToken(): Promise<string> {
    var token = jwt.sign({ username: AppConfigs.user }, AppConfigs.secret, {
      expiresIn: AppConfigs.tokenExpiration,
    });
    return token;
  }

  async verify(token: string) {
    await jwt.verify(token, AppConfigs.secret, function(err) {
      if (!err) {
        return true;
      } else {
        throw new UnauthorizedException(`Invalid token:  ${token}`);
      }
    });
  }
}
