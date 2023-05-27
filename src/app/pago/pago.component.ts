import { Component } from '@angular/core';
import { PagoService } from '../pago.service';
import { Router } from '@angular/router';
import { PaypalService } from '../paypal.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styles: [
  ]
})
export class PagoComponent {
  constructor(private pagoService: PagoService, private paypalservice: PaypalService, public router: Router, private toast: NgToastService) {
  }

  PayPal(): void {
    this.paypalservice.postCreaOrder().subscribe(data=>{
      console.log(data)
      if(data.approval_url){
        window.location.href = data.approval_url;
      }else{
        if(data.error == "Error status distinto de 200")
          this.toast.success({detail: '¡Genial!', summary: 'Parece que ya eres premium', duration: 3000})
        else if (data.error=="Debes autentificarte para poder obtener la membresia."){
          this.toast.error({detail: 'Logeo requerido', summary: 'Autenticate para acceder', duration: 3000})
        }else{
          this.toast.error({detail: 'Ups', summary: 'Parece que algo ha salido mal', duration: 3000})
        }
      }
    })
  }
}