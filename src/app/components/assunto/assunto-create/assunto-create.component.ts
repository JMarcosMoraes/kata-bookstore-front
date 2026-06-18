import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/models/assuntos';
import { AssuntoService } from 'src/app/services/assunto.service';

@Component({
  selector: 'app-assunto-create',
  templateUrl: './assunto-create.component.html',
  styleUrls: ['./assunto-create.component.css']
})
export class AssuntoCreateComponent implements OnInit {

  assunto: Assunto = {
    id: null,
    descricao: ''    
  }

  descricao: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: AssuntoService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.assunto).subscribe(() => {
      this.toast.success('Assunto Cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['assuntos']);
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
