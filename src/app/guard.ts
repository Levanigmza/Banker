import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { UserDataservice } from './services/UserData.service';

export const adminGuardGuard: CanActivateFn = () => {
    const userDataService = inject(UserDataservice);
    const router = inject(Router);

    return userDataService.isAdmin() ? true : router.createUrlTree(['home']);
};

export const userGuardGuard: CanActivateFn = () => {
    const userDataService = inject(UserDataservice);
    const router = inject(Router);

    return userDataService.isUser() ? true : router.createUrlTree(['home']);
};

export const isAuthenticatedGuard: CanActivateFn = () => {
    const userDataService = inject(UserDataservice);
    const router = inject(Router);

    return userDataService.isAuthenticated() ? true : router.createUrlTree(['home']);
};

