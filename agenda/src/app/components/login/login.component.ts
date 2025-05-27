import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  class_validate = "needs-validation";
  mensagem = "";
  form_login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authService: AuthService) {
  }

  valida_campos_dados(): boolean {
    if (this.form_login.invalid) {
      this.class_validate = "needs-validation";
      return false;
    } else {
      this.class_validate = "was-validated";
      return true;
    }
  }

  logar() {
    if (this.valida_campos_dados()) {
      let user = {
        "username": this.form_login.get('username')?.value, "password":
          this.form_login.get('password')?.value
      };
      if (!this.authService.isLoggedIn()) {
        this.authService.login(user).subscribe({
          next: token => {
            if (token) {
              this.authService.setToken(token['token']);
              this.router.navigateByUrl('/contato/list');
            }
          },
          error: error => {
            console.error('Houve um erro:', error);
            console.log(error.error.message);
            this.mensagem = error.error.message;
          }
        });
      } else {
        this.router.navigateByUrl('/contato/list');
      }
    }
  }
}
