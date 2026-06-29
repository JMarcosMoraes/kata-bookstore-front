import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/livros';
import { Assunto } from 'src/app/models/assuntos';
import { Autor } from 'src/app/models/autores';
import { LivroService } from 'src/app/services/livro.service';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css']
})
export class BookstoreComponent implements OnInit {

  livros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  assuntos: Assunto[] = [];
  autores: Autor[] = [];

  filtroTitulo: string = '';
  filtroAssunto: Assunto | null = null;
  filtroAutor: Autor | null = null;

  constructor(
    private livroService: LivroService,
    private assuntoService: AssuntoService,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    // Carrega livros
    this.livroService.findAll().subscribe((res: Livro[]) => {
      this.livros = res;
      this.livrosFiltrados = [...this.livros];
    });

    // Carrega assuntos
    this.assuntoService.findAll().subscribe((res: Assunto[]) => {
      this.assuntos = res;
    });

    // Carrega autores
    this.autorService.findAll().subscribe((res: Autor[]) => {
      this.autores = res;
    });
  }

  filtrarLivros(): void {
    this.livrosFiltrados = this.livros.filter(livro => {
      const tituloOk = livro.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase());
      const assuntoOk = this.filtroAssunto ? livro.assuntos.some(a => a.id === this.filtroAssunto.id) : true;
      const autorOk = this.filtroAutor ? livro.autores.some(a => a.id === this.filtroAutor.id) : true;
      return tituloOk && assuntoOk && autorOk;
    });
  }

  delete(id: number): void {
    this.livroService.delete(id).subscribe(() => {
      this.livros = this.livros.filter(l => l.id !== id);
      this.filtrarLivros();
    });
  }
}
