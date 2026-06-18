import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/models/autores';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  autor: Autor = {
    id:     '',
    nome:   ''

  }

  constructor(
    private service: AutorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.autor.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.autor.id).subscribe(resposta => {
      this.autor = resposta;
      })
   }
  
  update(): void {
    this.service.update(this.autor).subscribe(() => {
      this.toast.success('Autor Atualizado com sucesso', 'Update');
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

