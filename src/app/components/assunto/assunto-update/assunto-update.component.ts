import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/models/assuntos';
import { AssuntoService } from 'src/app/services/assunto.service';

@Component({
  selector: 'app-assunto-update',
  templateUrl: './assunto-update.component.html',
  styleUrls: ['./assunto-update.component.css']
})
export class AssuntoUpdateComponent implements OnInit {

  assunto: Assunto = {
    id:     '',
    descricao:   ''

  }

  constructor(
    private service: AssuntoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.assunto.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.assunto.id).subscribe(resposta => {
      this.assunto = resposta;
      })
   }
  
  update(): void {
    this.service.update(this.assunto).subscribe(() => {
      this.toast.success('Assunto Atualizado com sucesso', 'Update');
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

