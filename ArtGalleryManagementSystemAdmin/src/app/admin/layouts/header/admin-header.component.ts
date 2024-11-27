import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-header.component.html',
  host:{
    'collision': 'AdminHeaderComponent'
  }
})
export class AdminHeaderComponent {
  logOut(){
    sessionStorage.removeItem('loggedInAdmin')
    window.location.href = '/login'
  }
}
