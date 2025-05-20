import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatosUrl = 'http://localhost:5000/api/v1/contact';
  private headers = new HttpHeaders({ "Authorization": "tokenJWT" })
  
  constructor(private http: HttpClient) { }

  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.contatosUrl}`,
      { "headers": this.headers }).pipe(
        map((contatos: any) => {
          return contatos;
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
    let contatoJson = { "contato": JSON.stringify(contatoParam) };
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
    let contatoJson = { "contato": JSON.stringify(contatoParam) };
    return this.http.put<any>(`${this.contatosUrl}`, contatoJson, {
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
