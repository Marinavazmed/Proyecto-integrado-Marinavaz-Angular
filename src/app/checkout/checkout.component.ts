import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from '../paypal.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent {

  constructor(private route: ActivatedRoute, private paypalservice: PaypalService) { 

  }

  ngOnInit(){
    this.route.queryParams
    .subscribe(params => {
      let payerID = params['PayerID']
      let token = params['token']
    })
  }

  completaPago(){
    this.route.queryParams
    .subscribe(params => {
      let payerID = params['PayerID']
      let token = params['token']
      this.paypalservice.captureOrder(payerID, token).subscribe(data=>{console.log(data)});
    })

  }

}
