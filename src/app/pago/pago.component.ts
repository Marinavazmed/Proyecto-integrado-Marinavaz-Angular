import { Component } from '@angular/core';
import { PagoService } from '../pago.service';
import { Router } from '@angular/router';
import { PaypalService } from '../paypal.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styles: [
  ]
})
export class PagoComponent {
  constructor(private pagoService: PagoService, private paypalservice: PaypalService, public router: Router) {
  }

  PayPal(): void {
    this.paypalservice.postCreaOrder().subscribe(data=>{
      console.log(data)
      window.location.href = data.approval_url;
    })
  }
}