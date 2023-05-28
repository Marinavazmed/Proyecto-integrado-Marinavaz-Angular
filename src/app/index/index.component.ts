import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styles: [] 
})
export class IndexComponent {
  constructor(public router: Router){
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
}


