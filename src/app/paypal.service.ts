import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getURLs } from './utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  public url = getURLs()
  constructor(private _http: HttpClient) { }

  postCreaOrder(): Observable<any> {
    const url = this.url + 'paypal/order/create'
    return this._http.post(url, null);
  }

  captureOrder(payerID:any, token:any):Observable<any>{
    const url = this.url + 'paypal/order/capture'
    const body = { payerID: payerID.toString(), token: token.toString() };
    return this._http.post<any>(url,body)
  }
}
