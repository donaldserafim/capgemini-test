import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Usuario } from '../model/Usuario';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/usuario';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getUsuarios (): Observable<Usuario[]> {
    const url = `${apiUrl}/ativo/true`;
    return this.http.get<Usuario[]>(url)
      .pipe(
        tap(usuarios => console.log('leu os usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`leu o usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  addUsuario (usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiUrl, usuario, httpOptions).pipe(
      tap((usuario: Usuario) => console.log(`adicionou o usuario com w/ id=${usuario.id}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  updateUsuario(id, usuario): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, usuario, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateUsuario'))
    );
  }

  deleteUsuario (id): Observable<Usuario> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Usuario com id=${id}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }


}
