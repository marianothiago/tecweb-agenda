import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contato } from '../../models/contato.model';
import { Router } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato-edit.component.html',
  styleUrl: './contato-edit.component.css'
})
export class ContatoEditComponent {

  idContato!: number;
  contato!: Contato;
  class_validate = "needs-validation";
  form_dados = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private contatoService: ContatoService) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state['idContato']) {
      const idContato = state['idContato'];
      if (idContato) {
        this.idContato = idContato;
      }
    }
  }

  valida_campos_dados(): boolean {
    if (this.form_dados.invalid) {
      this.class_validate = "was-validated";
      return false;
    } else {
      this.class_validate = "needs-validation";
      return true;
    }
  }

  salvar() {
    if (this.valida_campos_dados()) {
      let contato = Object.assign(this.form_dados.value)
      if (this.idContato) {
        this.contato.name = contato.nome;
        this.contato.email = contato.email;
        this.contato.phoneNUmber = contato.telefone;
        this.contatoService.editContato(this.contato);
      } else {
        this.contatoService.addContato(contato);
      }
      this.router.navigateByUrl('/contato/list');
    }
  }

}
