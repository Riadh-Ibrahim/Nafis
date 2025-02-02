import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ConstantesService {
    private apiUrl = 'http://localhost:3000/constantes-vitales'; 
  
    constructor(private http: HttpClient) {}
  
    saveConstantes(data: any): Observable<any> {
      return this.http.post(this.apiUrl, data);
    }
  
    getConstantes(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  }

