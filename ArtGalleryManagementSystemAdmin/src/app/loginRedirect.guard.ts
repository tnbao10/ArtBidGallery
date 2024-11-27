import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (sessionStorage.getItem('loggedInAdmin')) {
      // Nếu đã đăng nhập, chuyển hướng đến /user/home
      this.router.navigate(['/admin/dashboard']);
      return false; // Ngăn truy cập vào trang login hoặc register
    } else {
      return true; // Cho phép truy cập nếu chưa đăng nhập
    }
  }
}
