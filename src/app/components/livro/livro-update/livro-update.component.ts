import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Assunto } from 'src/app/models/assuntos';
import { Autor } from 'src/app/models/autores';
import { Livro } from 'src/app/models/livros';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AutorService } from 'src/app/services/autor.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  livro: Livro = {
    id: null,
    titulo: '',
    editora: '',
    edicao: null,
    anoPublicacao: '',
    assunto: null,
    autores: []
  }

  assuntos: Assunto[] = [];
  autores: Autor[] = [];

  titulo: FormControl = new FormControl(null, Validators.minLength(3));
  editora: FormControl = new FormControl(null, Validators.minLength(3));
  edicao: FormControl = new FormControl(null, [Validators.min(1), Validators.pattern('^[0-9]+$')]);
  anoPublicacao: FormControl = new FormControl(null, [Validators.pattern('^[0-9]{4}$')]);

  constructor(
    private livroService: LivroService,
    private assuntoService: AssuntoService,
    private autorService: AutorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.livro.id = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      assuntos: this.assuntoService.findAll(),
      autores: this.autorService.findAll(),
      livro: this.livroService.findById(this.livro.id)
    }).subscribe(({ assuntos, autores, livro }) => {
      this.assuntos = assuntos;
      this.autores = autores;
      this.livro = livro;

      if (!this.livro.autores) {
        this.livro.autores = [];
      }

      this.syncSelectedValues();
    });
  }

  private syncSelectedValues(): void {
    if (!this.livro || !this.livro.id) {
      return;
    }

    if (this.livro.assunto && this.assuntos.length) {
      const selectedAssunto = this.assuntos.find(a => a.id === this.livro.assunto.id);
      if (selectedAssunto) {
        this.livro.assunto = selectedAssunto;
      }
    }

    if (this.livro.autores && this.livro.autores.length && this.autores.length) {
      this.livro.autores = this.livro.autores
        .map(livroAutor => this.autores.find(a => a.id === livroAutor.id) || livroAutor)
        .filter(a => !!a);
    }
  }

  compareAssunto(a: Assunto, b: Assunto): boolean {
    return a && b ? a.id === b.id : a === b;
  }

  compareAutor(a: Autor, b: Autor): boolean {
    return a && b ? a.id === b.id : a === b;
  }
  
  update(): void {
    if (!this.livro.assunto) {
      this.toast.error('Selecione um assunto antes de atualizar', 'Validação');
      return;
    }

    if (!this.livro.autores || this.livro.autores.length === 0) {
      this.toast.error('Selecione pelo menos um autor antes de atualizar', 'Validação');
      return;
    }

    this.livroService.update(this.livro).subscribe(() => {
      this.toast.success('Livro atualizado com sucesso', 'Update');
      this.router.navigate(['livros']);
    }, ex => {
      console.log(ex);
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }
}

