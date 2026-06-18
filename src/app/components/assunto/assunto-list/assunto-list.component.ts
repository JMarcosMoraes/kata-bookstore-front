import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Assunto } from 'src/app/models/assuntos';
import { AssuntoService } from 'src/app/services/assunto.service';

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

  constructor(private service: AssuntoService) { }

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

}

