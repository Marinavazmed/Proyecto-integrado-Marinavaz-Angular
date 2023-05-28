import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { getURLs } from './utils';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  public url = getURLs()
  public url_pago: any;
  constructor(private http: HttpClient,) { }


  iniciarPago():Observable<any>{
    this.http.get(this.url + `paypal/create/order`).subscribe((data)=>{
      this.url_pago = data;
    });
    return this.http.get(this.url_pago);
  }

}

