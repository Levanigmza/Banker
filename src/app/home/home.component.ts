import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerNewUser : boolean = false
  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
