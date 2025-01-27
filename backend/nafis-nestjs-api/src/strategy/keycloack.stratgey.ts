// src/strategy/keycloak.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-keycloak';
import { keycloakConfig } from '../keycloak.config'; // Import the Keycloak config

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(keycloakConfig);
  }

  validate(payload: any) {
    
    return payload; 
  }
}
