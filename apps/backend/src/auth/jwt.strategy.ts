import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is missing');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Do not allow expired tokens
      secretOrKey: jwtSecret,  // Ensure it's always a string or buffer
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email, role: payload.role }; // Return authenticated user data
  }
}
