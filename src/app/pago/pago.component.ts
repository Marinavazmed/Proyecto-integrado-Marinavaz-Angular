import { Component } from '@angular/core';
import { PagoService } from '../pago.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styles: [
  ]
})
export class PagoComponent {
  constructor(private pagoService: PagoService, public router: Router) {
  }

  PayPal(): void {
    this.pagoService.iniciarPago()
  }
}