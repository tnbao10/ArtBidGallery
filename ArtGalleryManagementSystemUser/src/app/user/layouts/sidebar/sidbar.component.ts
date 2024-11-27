import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConectActive } from '../../services/conectActive';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'sidbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './sidbar.component.html',
  host:{
    'collision': 'SidbarComponent'
  }
})
export class SidbarComponent implements OnInit {
  activeClasses = {
    userHome:'',
    contactUs:'',
    aboutUs:'',
    product:'',
    profile:'',
    auction:'',
    postArt:'',
    review:'',
    editArt:''
  };
  ariaUser:boolean
  ariaAuction:boolean

  showUser:string
  showAuction:string
  user:any

  constructor(
    private conectActive:ConectActive,
    private userService:UserService
  ) {
    this.conectActive.data$.subscribe((data) => {
      console.log(data)
      if (data) {
        this.activeClasses = { ...this.activeClasses, [data]: 'active' };
      }
    });
  }
  async ngOnInit() {
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];
    console.log(this.user)

  }
}
