import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  ELEMENT_DATA: Usuario[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: UsuarioService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void { 
    this.findAll();
   }

  findAll(){
      this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Usuario>(resposta);
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
      backdrop: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          this.toast.success('Usuário excluído com sucesso', 'Delete');
          this.findAll();
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
    });
  }

}

