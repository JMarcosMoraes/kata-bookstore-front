import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assunto } from '../models/assuntos';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Assunto> {
    return this.http.get<Assunto>(`${API_CONFIG.baseUrl}/assuntos/${id}`);
  }

  findAll(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${API_CONFIG.baseUrl}/assuntos`);
  }

  create(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(`${API_CONFIG.baseUrl}/assuntos`, assunto);
  }

  update(assunto: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${API_CONFIG.baseUrl}/assuntos/${assunto.id}`, assunto);
  }

  delete(id: any): Observable<Assunto> {
    return this.http.delete<Assunto>(`${API_CONFIG.baseUrl}/assuntos/${id}`);
  }
}
