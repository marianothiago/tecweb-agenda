import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contato } from '../../models/contato.model';
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

  constructor(private router: Router, private contatoService: ContatoService) {}

  ngOnInit(){
    this.atualizarContatos();
  }

  atualizarContatos(){
    this.contatoService.getContatos().subscribe(
      {
        next:(contatos) =>{
          this.contatos = contatos;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  editar(id: number) {
    alert(id);
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
}
