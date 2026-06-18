import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Autor } from '../models/autores';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Autor> {
    return this.http.get<Autor>(`${API_CONFIG.baseUrl}/autores/${id}`);
  }

  findAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${API_CONFIG.baseUrl}/autores`);
  }

  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(`${API_CONFIG.baseUrl}/autores`, autor);
  }

  update(autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${API_CONFIG.baseUrl}/autores/${autor.id}`, autor);
  }

  delete(id: any): Observable<Autor> {
    return this.http.delete<Autor>(`${API_CONFIG.baseUrl}/autores/${id}`);
  }
}
