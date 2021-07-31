import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    const isAuthenticated = localStorage.getItem('user') ? true : false;
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authenticated !');
    }
    return isAuthenticated;
  }
}
