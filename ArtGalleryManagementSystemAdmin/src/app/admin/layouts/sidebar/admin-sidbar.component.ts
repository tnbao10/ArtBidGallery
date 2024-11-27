import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConectActive } from '../../services/conectActive';
import { NgClass } from '@angular/common';


@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgClass],
  templateUrl: './admin-sidbar.component.html',
  
  host:{
    'collision': 'AdminSidbarComponent'
  }
})
export class AdminSidbarComponent implements OnInit{
  activeClasses = {
    calendar: '',
    buyer: '',
    seller: '',
    manageUser: '',
    auction:'',
    dashboard: '',
    auctionCreate:''
  };
  ariaUser:boolean
  ariaAuction:boolean

  showUser:string
  showAuction:string
  constructor(
    private conectActive:ConectActive
  ) {}
  ngOnInit() {
    this.conectActive.data$.subscribe((data) => {
      console.log(data)
      if (data) {
        if(data == 'buyer' || data=='seller'){
          this.activeClasses.manageUser = 'active'
          this.ariaUser= true
          this.showUser = 'show'
        }
        if(data == 'auctionCreate'){
          this.activeClasses.auction = 'active'
          this.ariaAuction= true
          this.showAuction = 'show'
        }
        this.activeClasses = { ...this.activeClasses, [data]: 'active' };

      }
    });
  }
}
