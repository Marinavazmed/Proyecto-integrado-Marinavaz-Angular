import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalService } from '../paypal.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent {
  proceso = false;
  constructor(private route: ActivatedRoute, private paypalservice: PaypalService, private router: Router) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        let payerID = params['PayerID']
        let token = params['token']
      })
  }

  completaPago() {
    this.proceso=true;
    this.route.queryParams
      .subscribe(params => {
        let payerID = params['PayerID']
        let token = params['token']
        this.paypalservice.captureOrder(payerID, token).subscribe(data => {
          console.log(data)
          document.getElementById("btn_modal_confirmacion")?.click()
          this.proceso=false;
        });
      })

  }

  cerrarModal() {
    document.getElementById("btn_modal_cierre")?.click()
  }
  
  onClose(){
    this.router.navigateByUrl("/crear_sala")
  }
}
