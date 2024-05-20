import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataservice {
  private registrations: string[][] = [];

  constructor() { 
    const adminUser = ['Admin', 'User', 'admin@mail.com', '1234567890', '123' , '1'];
    const userTemplate =  ['User', 'User', 'user@mail.com', '123456789', '123' , '0'];
    this.registrations.push(adminUser);
    this.registrations.push(userTemplate);

  }

  addRegistration(registration: string[]): void {
    this.registrations.push(registration);
  }

  getRegistrations(): string[][] {
    return this.registrations;
  }

  isEmailRegistered(email: string): boolean {
    return this.registrations.some(reg => reg[2] === email); 
  }
  isPersonalNumberRegistered(personalNumber : string) : boolean{
    return this.registrations.some(reg => reg[3] === personalNumber); 

  }

  validateCredentials(email: string, password: string): boolean {
    return this.registrations.some(reg => reg[2] === email && reg[4] === password);
  }

  generateToken(email: string): string {
    const user = this.registrations.find(reg => reg[2] === email);
    if (user) {
      const userRole = user[5]; 
      if (userRole === '0') {
        return 'User_token';
      } else if (userRole === '1') {
        return 'Admin_token';
      }
    }
    return '';
  }
}
