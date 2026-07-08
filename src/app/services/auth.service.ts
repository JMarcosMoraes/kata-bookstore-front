import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();
   constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return this.jwtService.decodeToken(token);
  }

  getRoles(): string[] {
    const payload = this.getDecodedToken();
    console.log('getRoles called, payload:', payload);
    if (!payload) {
      return [];
    }

    const roles = payload.roles || payload.authorities || payload.authority || payload.perfil;
    console.log('Roles:', roles);
    if (!roles) {
      return [];
    }

    if (Array.isArray(roles)) {
      console.log('getRoles called, roles:', roles.toString());
      return roles.map(role => role.toString());
    }
    
    console.log('getRoles called, roles:', roles.toString());
    return [roles.toString()];
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    const tokenRoles = this.getRoles().map(role => role.toUpperCase());
    
    console.log('--- > hasAnyRole called, tokenRoles:', tokenRoles);

    return requiredRoles.some(required => {
      const normalized = required.toUpperCase();
      return tokenRoles.includes(normalized)
        || tokenRoles.includes(`ROLE_${normalized}`)
        || tokenRoles.includes(normalized.replace(/^ROLE_/, ''));
    });
  }

  isAuthenticated() {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }

}
