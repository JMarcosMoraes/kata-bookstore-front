import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livros';
import { LivroService } from 'src/app/services/livro.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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
    const rows = this.dataSource.filteredData.map(livro => [
      livro.id,
      livro.titulo,
      livro.assunto?.descricao || '-',
      livro.autores?.map(autor => autor.nome).join(', ') || '-',
    ]);

    const doc = new jsPDF();
    const image = new Image();
    image.src = 'assets/img/logo_M.png';

    image.onload = () => {
      doc.addImage(image, 'PNG', 14, 12, 24, 24);
      doc.setFontSize(18);
      doc.text('Bookstore', 44, 18);
      doc.setFontSize(12);
      doc.text('Lista de Livros', 44, 26);
      doc.setFontSize(10);
      doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 42);

      autoTable(doc, {
        head: [['ID', 'Título', 'Assunto', 'Autores']],
        body: rows,
        startY: 50,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
          0: { cellWidth: 16 },
          1: { cellWidth: 60 },
          2: { cellWidth: 50 },
          3: { cellWidth: 60 },
        },
        margin: { left: 14, right: 14 },
      });

      doc.save('livros.pdf');
    };

    image.onerror = () => {
      doc.setFontSize(18);
      doc.text('Bookstore', 14, 20);
      doc.setFontSize(12);
      doc.text('Lista de Livros', 14, 30);
      doc.setFontSize(10);
      doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 36);

      autoTable(doc, {
        head: [['ID', 'Título', 'Assunto', 'Autores']],
        body: rows,
        startY: 44,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
          0: { cellWidth: 16 },
          1: { cellWidth: 60 },
          2: { cellWidth: 50 },
          3: { cellWidth: 60 },
        },
        margin: { left: 14, right: 14 },
      });

      doc.save('livros.pdf');
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any): void {
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

}

