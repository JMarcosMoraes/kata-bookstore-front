import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: Usuario = {
    id:     '',
    nome:   '',
    cpf:    '',
    email:   '',
    senha:   '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: UsuarioService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuario.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  private normalizarPerfis(perfis: any): number[] {
    if (perfis == null) {
      return [];
    }

    if (!Array.isArray(perfis)) {
      perfis = [perfis];
    }

    const mapaPerfis: Record<string, number> = {
      ADMIN: 0,
      CLIENTE: 1,
      USUARIO: 2,
      ROLE_ADMIN: 0,
      ROLE_CLIENTE: 1,
      ROLE_USUARIO: 2
    };

    return perfis
      .map(perfil => {
        if (typeof perfil === 'number' && Number.isFinite(perfil)) {
          return perfil;
        }

        if (typeof perfil === 'string') {
          const chave = perfil.trim().toUpperCase();
          if (mapaPerfis[chave] !== undefined) {
            return mapaPerfis[chave];
          }

          const numero = Number(chave);
          return Number.isNaN(numero) ? null : numero;
        }

        if (perfil && typeof perfil === 'object') {
          const valor = perfil.id ?? perfil.codigo ?? perfil.value;

          if (typeof valor === 'number') {
            return valor;
          }

          if (typeof valor === 'string') {
            const chave = valor.trim().toUpperCase();
            if (mapaPerfis[chave] !== undefined) {
              return mapaPerfis[chave];
            }

            const numero = Number(chave);
            return Number.isNaN(numero) ? null : numero;
          }
        }

        return null;
      })
      .filter((perfil): perfil is number => perfil !== null);
  }

  findById(): void {
    this.service.findById(this.usuario.id).subscribe(resposta => {
      this.usuario = {
        ...resposta,
        perfis: this.normalizarPerfis(resposta.perfis)
      };
    })
   }
  
  update(): void {
    this.usuario.perfis = this.normalizarPerfis(this.usuario.perfis);

    this.service.update(this.usuario).subscribe(() => {
      this.toast.success('Usuário Atualizado com sucesso', 'Update');
      this.router.navigate(['usuarios']);
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

  hasPerfil(perfil: number): boolean {
    const valorDesejado = Number(perfil);
    return this.usuario.perfis.some(perfilAtual => {
      const valorAtual = typeof perfilAtual === 'string'
        ? this.normalizarPerfis([perfilAtual])[0]
        : Number(perfilAtual);

      return Number(valorAtual) === valorDesejado;
    });
  }

  addPerfil(perfil: number): void {
    const perfilValue = Number(perfil);

    if (this.hasPerfil(perfilValue)) {
      this.usuario.perfis = this.usuario.perfis.filter(perfilAtual => {
        const valorAtual = typeof perfilAtual === 'string'
          ? this.normalizarPerfis([perfilAtual])[0]
          : Number(perfilAtual);

        return Number(valorAtual) !== perfilValue;
      });
    } else {
      this.usuario.perfis = [...this.usuario.perfis, perfilValue];
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

}

