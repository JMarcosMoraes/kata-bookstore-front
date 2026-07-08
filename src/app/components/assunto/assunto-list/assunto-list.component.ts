import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/models/assuntos';
import { AssuntoService } from 'src/app/services/assunto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assunto-list',
  templateUrl: './assunto-list.component.html',
  styleUrls: ['./assunto-list.component.css']
})
export class AssuntoListComponent implements OnInit {

  ELEMENT_DATA: Assunto[] = [];
  displayedColumns: string[] = ['position', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Assunto>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private service: AssuntoService,
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
      this.dataSource = new MatTableDataSource<Assunto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          this.toast.success('Assunto excluído com sucesso', 'Delete');
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
  })
 }
}

