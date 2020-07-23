import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Color } from "../models/Color";

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  constructor(private http: HttpClient) { }



  get(recurso: any, type: any = 'json'): Observable<any> {
    return this.http.get<Color>(`${environment.apiUrl}`+recurso, { responseType: type });
  }

}
