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
      if(data.approval_url){
        window.location.href = data.approval_url;
      }else{
        if(data.error == "Error status distinto de 200")
          alert("Parece que ya eres un usuario premium. ¡Genial!")
        else if (data.error=="Debes autentificarte para poder obtener la membresia."){
          alert(data.error)
        }else{
          alert("Vaya. Parece que algo ha salido mal.")
        }
      }
    })
  }
}