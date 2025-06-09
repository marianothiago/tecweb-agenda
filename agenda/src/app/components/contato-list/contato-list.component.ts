import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contato, ContatosPaginacao } from '../../models/contato.model';
import { ContatoService } from '../../services/contato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato-list',
  imports: [CommonModule],
  templateUrl: './contato-list.component.html',
  styleUrl: './contato-list.component.css'
})
export class ContatoListComponent {

  contatos: Array<Contato> = [];
  pagina = 1;
  itensPorPagina = 1;
  qtdPaginas = 1;

  constructor(private router: Router, private contatoService: ContatoService) {}

  ngOnInit(){
    this.atualizarContatos();
  }

  atualizarContatos(){
    this.contatoService.getContatos(this.pagina, this.itensPorPagina).subscribe(
      {
        next:(contatosPaginacao) =>{
          this.contatos = contatosPaginacao.contacts;
          this.pagina = contatosPaginacao.page;
          this.qtdPaginas = contatosPaginacao.sizePages;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  editar(id: number) {
    this.router.navigateByUrl("contato/edit",
      {
        state:{
            idContato: id
        }
      }
    );
  }

  remover(id: number) {
     this.contatoService.removeContato(id);
     this.atualizarContatos();
  }

  proximo(): void {
    if (this.pagina < this.qtdPaginas) {
      this.pagina++;
      this.atualizarContatos();
    }
  }

  anterior(): void {
    if (this.pagina > 1) {
      this.pagina--;
      this.atualizarContatos();
    }
  }
}
