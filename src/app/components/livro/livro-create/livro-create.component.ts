import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/models/assuntos';
import { Livro } from 'src/app/models/livros';
import { AssuntoService } from 'src/app/services/assunto.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro: Livro = {
    id: null,
    nome: '',
    titulo: '',
    editora: '',
    edicao: null,
    anoPublicacao: '',
    assunto: null,
    autores: []
  }

  assuntos: Assunto[] = [];
  
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  titulo: FormControl = new FormControl(null, Validators.minLength(3));
  editora: FormControl = new FormControl(null, Validators.minLength(3));
  edicao: FormControl = new FormControl(null, Validators.minLength(3));
  anoPublicacao: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private assuntoService: AssuntoService,
    private livroService: LivroService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAssuntos();
  }

  loadAssuntos(): void {
    this.assuntoService.findAll().subscribe(resposta => {
      this.assuntos = resposta;
    });
  }

  create(): void {
    if (!this.livro.assunto) {
      this.toast.error('Selecione um assunto antes de cadastrar', 'Validação');
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
