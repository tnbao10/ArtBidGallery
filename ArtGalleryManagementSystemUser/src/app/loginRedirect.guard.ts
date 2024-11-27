import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (sessionStorage.getItem('loggedInUser')) {
      // Nếu đã đăng nhập, chuyển hướng đến /user/home
      this.router.navigate(['/user/home']);
      return false; // Ngăn truy cập vào trang login hoặc register
    } else {
      return true; // Cho phép truy cập nếu chưa đăng nhập
    }
  }
}
