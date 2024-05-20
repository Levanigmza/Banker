import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataservice } from '../services/UserData.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  email: string = '';
  password: string = '';
  Incorrect: boolean = false;

  constructor(private router: Router , private userData : UserDataservice) { }

  signIn() {
    if (this.userData.validateCredentials(this.email, this.password)) {
      const token = this.userData.generateToken(this.email);
      localStorage.setItem('authToken', token); 
      this.router.navigate(['/valute']);
    } else {
      this.Incorrect = true;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/registration']);
  }
}
