import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Colores } from "../models/Colores";

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  constructor(private http: HttpClient) { }



  getColores(pag:number,type: any = 'json'): Observable<any> {
    return this.http.get<Colores>(`${environment.apiUrl}colores`, { responseType: type });
  }

  getColor(idColor: string,type: any = 'json'): Observable<any> {
    return this.http.get<Colores>(`${environment.apiUrl}color/${idColor}`, { responseType: type });
  }

  post(body: any, type: any = 'json'): Observable<any> { 
    return this.http.post(`${environment.apiUrl}color`, body, { responseType: type });
  }

  put(body: any, type: any = 'json'): Observable<any> { 
    return this.http.put(`${environment.apiUrl}colores`, body, { responseType: type });
  }

  deleteColor(idColor: string,type: any = 'json'): Observable<any> {
    return this.http.delete<Colores>(`${environment.apiUrl}colores/${idColor}`, { responseType: type });
  }

 
}
