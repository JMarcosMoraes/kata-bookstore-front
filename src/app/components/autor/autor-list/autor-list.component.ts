import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/models/autores';
import { AutorService } from 'src/app/services/autor.service';


@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {

  ELEMENT_DATA: Autor[] = [];
  displayedColumns: string[] = ['position', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<Autor>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private service: AutorService,
        private toast: ToastrService,
        private router: Router,
        private route: ActivatedRoute
  ) { }

  ngOnInit(): void { 
    this.findAll();
   }

  findAll(){
      this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Autor>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any): void {
     const confirmDelete = window.confirm('Tem certeza que deseja excluir este autor?');

    if (confirmDelete) {
      this.service.delete(id).subscribe(() => {
        this.toast.success('Autor excluído com sucesso', 'Delete');
        this.findAll();
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
}

