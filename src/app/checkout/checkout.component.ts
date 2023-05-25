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
    this.route.queryParams
      .subscribe(params => {
        let payerID = params['PayerID']
        let token = params['token']
        this.paypalservice.captureOrder(payerID, token).subscribe(data => {
          console.log(data)
          document.getElementById("btn_modal_confirmacion")?.click()
        });
      })

  }

  btnSalas() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      let id = JSON.parse(localStorage.getItem("userData")!).id
      this.router.navigate(['/user-profile/:'+id]);
    });
  }

}
