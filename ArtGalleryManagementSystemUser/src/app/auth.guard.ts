import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (sessionStorage.getItem('loggedInUser')) {
      return true; // Cho phép truy cập nếu đã đăng nhập
    } else {
      // Chuyển hướng về trang login nếu chưa đăng nhập
      this.router.navigate(['/']);
      return false;
    }
  }
}