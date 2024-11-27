
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../conect';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './login.component.html',
  host:{
    'collision': 'LoginComponent'
  }
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  constructor(
    private conect: Conect
  ){}
  ngOnInit(): void {
    this.username = ''
    this.password = ''
    // this.conect.removeScript("src/bootstrap/js/bootstrap.bundle.min.js")
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/mousetrap/mousetrap.min.js")
    this.conect.removeScript("layouts/semi-dark-menu/app.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    this.conect.removeScript("src/plugins/src/waves/waves.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")


    this.conect.addStyle("layouts/semi-dark-menu/css/light/loader.css")
    this.conect.addStyle("layouts/semi-dark-menu/css/dark/loader.css")
    this.conect.addScript("layouts/semi-dark-menu/loader.js")
    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    this.conect.addStyle("layouts/semi-dark-menu/css/light/plugins.css")
    this.conect.addStyle("src/assets/css/light/authentication/auth-boxed.css")
    
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")

    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    
  }
  login(){
    // console.log("hehe")
    console.log(this.username + this.password)
    if(this.username == 'admin' && this.password == '123'){
      sessionStorage.setItem('loggedInAdmin',this.username)
      window.location.href = '/admin/dashboard'
      // this.router.navigate(['/admin/dashboard'])
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Email or Password invalid',
      })
    }
  }
}
