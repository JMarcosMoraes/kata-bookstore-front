import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livros';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Livro> {
    return this.http.get<Livro>(`${API_CONFIG.baseUrl}/livros/${id}`);
  }

  findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${API_CONFIG.baseUrl}/livros`);
  }

  create(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${API_CONFIG.baseUrl}/livros`, livro);
  }

  update(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${API_CONFIG.baseUrl}/livros/${livro.id}`, livro);
  }

  relatorioPdf(): Observable<Blob> {
    return this.http.get(`${API_CONFIG.baseUrl}/livros/relatorio/pdf`, {
      responseType: 'blob'
    });
  }

  delete(id: any): Observable<Livro> {
    return this.http.delete<Livro>(`${API_CONFIG.baseUrl}/livros/${id}`);
  }
}
