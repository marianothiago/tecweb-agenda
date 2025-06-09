import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contato, ContatosPaginacao } from '../models/contato.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatosUrl = 'http://localhost:5000/api/v1/contact';
  private headers = new HttpHeaders({ "Authorization": "tokenJWT" });
  
  constructor(private http: HttpClient, auth: AuthService) { 
    this.headers = new HttpHeaders({ "Authorization": auth.getToken() });
  }

  getContatos(pagina: number, itensPorPagina: number): Observable<ContatosPaginacao> {
    return this.http.get<ContatosPaginacao>(`${this.contatosUrl}?page=${pagina}&itensByPage=${itensPorPagina}`,
      { "headers": this.headers }).pipe(
        map((contatosPaginacao: any) => {
          return contatosPaginacao;
        })
      );
  }

  getContatoById(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.contatosUrl}/${id}`,
      { "headers": this.headers }).pipe(
        map(contato => {
          return contato;
        })
      );
  }

  addContato(contatoParam: Contato) {
    // let contatoJson = { "name": contatoParam.name, "email": contatoParam.email, "phoneNumber": contatoParam.phoneNumber };
    let contatoJson = JSON.stringify(contatoParam)
    this.http.post<any>(`${this.contatosUrl}`, contatoJson, {
      "headers":
        this.headers
    }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  editContato(contatoParam: Contato) {
    let contatoJson = { "name": contatoParam.name, "email": contatoParam.email, "phoneNumber": contatoParam.phoneNumber };
    return this.http.put<any>(`${this.contatosUrl}/${contatoParam.id}`, contatoJson, {
      "headers"
        : this.headers
    }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  removeContato(id: number) {
    this.http.delete<any>(`${this.contatosUrl}/${id}`, {
      "headers":
        this.headers
    }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  removeContatos() {
    this.http.delete<any>(`${this.contatosUrl}`, {
      "headers":
        this.headers
    }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

}
