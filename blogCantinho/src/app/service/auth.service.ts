import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };
  
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    }
  }
  

  login(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://cantinhocafe.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastro(user: User): Observable<User>{
    return this.http.post<User>('https://cantinhocafe.herokuapp.com/usuarios/cadastrar', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://cantinhocafe.herokuapp.com/usuarios/${id}`, this.token)

  }
  logado(){
     let ok: boolean = false

     if(environment.token != ''){
       ok = true
       
     }
     return ok
  }
}
