import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  userName: string = ''
  isLoggedIn : boolean = false;
  Navigate(){
    this.router.navigate(['/home']);

  }
}
