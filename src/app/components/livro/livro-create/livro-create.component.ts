import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/models/assuntos';
import { Autor } from 'src/app/models/autores';
import { Livro } from 'src/app/models/livros';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AutorService } from 'src/app/services/autor.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

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
    private assuntoService: AssuntoService,
    private autorService: AutorService,
    private livroService: LivroService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAssuntos();
    this.loadAutores();
  }

  loadAssuntos(): void {
    this.assuntoService.findAll().subscribe(resposta => {
      this.assuntos = resposta;
    });
  }

  loadAutores(): void {
    this.autorService.findAll().subscribe(resposta => {
      this.autores = resposta;
    });
  }

  create(): void {
    if (!this.livro.assunto) {
      this.toast.error('Selecione um assunto antes de cadastrar', 'Validação');
      return;
    }

    if (!this.livro.autores || this.livro.autores.length === 0) {
      this.toast.error('Selecione pelo menos um autor antes de cadastrar', 'Validação');
      return;
    }

    this.livroService.create(this.livro).subscribe(() => {
      this.toast.success('Livro Cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['livros']);
      }, ex => {
      console.log(ex);
        if(ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);          
          });
        } else {
          this.toast.error(ex.error.message);
        }      
      }
    )
  }

}
