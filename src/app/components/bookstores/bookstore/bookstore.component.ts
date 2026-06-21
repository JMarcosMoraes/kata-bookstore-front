import { Component } from '@angular/core';
import { Livro } from 'src/app/models/livros';
import { Assunto } from 'src/app/models/assuntos';
import { Autor } from 'src/app/models/autores';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css']
})
export class BookstoreComponent {
  livros: Livro[] = [
    {
      id: 1,
      titulo: 'Angular Essencial',
      editora: 'TechBooks',
      edicao: 2,
      anoPublicacao: '2023',
      valor: 59.90,
      quantidade: 10,
      assunto: {
        id: 1,
        descricao: 'Programação',
      },
      autores: [{id:1, nome: 'João Silva'}, {id:2, nome: 'Maria Souza'}]
    },
    {
      id: 2,
      titulo: 'Clean Code',
      editora: 'Prentice Hall',
      edicao: 1,
      anoPublicacao: '2008',
      valor: 49.90,
      quantidade: 5,
      assunto: {
        id: 2,
        descricao: 'Boas práticas',
      },
      autores: [{id:3, nome: 'Robert C. Martin'}]
    }
  ];

  assuntos: Assunto[] = [
    { id: 1, descricao: 'Programação' },
    { id: 2, descricao: 'Boas práticas' },
    { id: 3, descricao: 'Banco de Dados' }
  ];
  autores: Autor[] = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Souza' },
    { id: 3, nome: 'Robert C. Martin' }
  ];

  filtroTitulo: string = '';
  filtroAssunto: Assunto | null = null;
  filtroAutor: Autor | null = null;

  livrosFiltrados: Livro[] = [...this.livros];

  filtrarLivros() {
    this.livrosFiltrados = this.livros.filter(livro => {
      const tituloOk = livro.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase());
      const assuntoOk = this.filtroAssunto ? livro.assunto === this.filtroAssunto : true;
      const autorOk = this.filtroAutor ? livro.autores.includes(this.filtroAutor) : true;
      return tituloOk && assuntoOk && autorOk;
    });
  }
}