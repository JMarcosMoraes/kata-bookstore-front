import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/models/assuntos';
import { Autor } from 'src/app/models/autores';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.css']
})
export class AutorCreateComponent implements OnInit {

  autor: Autor = {
    id: null,
    nome: ''    
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: AutorService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.autor).subscribe(() => {
      this.toast.success('Autor Cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['autores']);
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
