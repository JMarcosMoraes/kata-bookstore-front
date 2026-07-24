import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
  }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}/usuarios`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_CONFIG.baseUrl}/usuarios`, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${usuario.id}`, usuario);
  }

    delete(id: any): Observable<Usuario> {
      return this.http.delete<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
    }
}
