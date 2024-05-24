import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserDataservice {


    private registrations: string[][] = [];

    constructor(private router: Router) {
        const adminUser = ['Admin', 'User', 'admin@mail.com', '1234567890', '123', '1'];
        const userTemplate = ['Levani', 'Gmz', 'user@mail.com', '123456789', '123', '0'];
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
    isPersonalNumberRegistered(personalNumber: string): boolean {
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

    GetUserID(email: string): string | null {
        const user = this.registrations.find(reg => reg[2] === email);
        return user ? user[3] : null;
    }
    getUserNameAndSurname(personalNumber: string): { name: string, surname: string } | null {
        const user = this.registrations.find(reg => reg[3] === personalNumber);
        if (user) {
            return { name: user[0], surname: user[1] };
        }
        return null;
    }


    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        return token === 'User_token' || token === 'Admin_token';
    }

    isUser(): boolean {
        const token = localStorage.getItem('authToken');
        return token === 'User_token';
    }

    isAdmin(): boolean {
        const token = localStorage.getItem('authToken');
        return token === 'Admin_token';
    }

    clearLocalStorage() {
        localStorage.removeItem("authToken")
        localStorage.removeItem("UserId")
        this.router.navigate(['/home']);

    }
}
