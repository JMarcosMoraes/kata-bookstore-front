import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livros';
import { LivroService } from 'src/app/services/livro.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {

  ELEMENT_DATA: Livro[] = [];
  displayedColumns: string[] = ['position', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<Livro>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private service: LivroService,
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
      this.dataSource = new MatTableDataSource<Livro>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  exportPdf(): void {
    this.service.relatorioPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'livros.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, err => {
      this.toast.error('Erro ao gerar o relatório em PDF', 'Exportar PDF');
      console.error(err);
    });
  }

  exportPdfAutor(): void {
    this.service.relatorioPdfAutor().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'autor-livros.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, err => {
      this.toast.error('Erro ao gerar o relatório em PDF', 'Exportar PDF');
      console.error(err);
    });
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
          this.toast.success('Livro excluído com sucesso', 'Delete');
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