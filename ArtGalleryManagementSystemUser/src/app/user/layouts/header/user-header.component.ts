declare var google: any
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { BaseURLService } from '../../services/baseURL.service';
import Swal from 'sweetalert2';

import { AuctionService } from '../../services/auction.service';
import { BidOrder } from '../../entities/bidorder.entity';
import { error } from 'jquery';
import moment from 'moment';

import { SignalrService } from '../../../signalr.service';


@Component({
  selector: 'user-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-header.component.html',
  host: {
    'collision': 'UserHeaderComponent'
  }
})
export class UserHeaderComponent implements OnInit {

  user:any
  theme:boolean
  cartItems :any
  imageUrl:any
  bidOrdersInfo:number
  constructor(
    private conect: Conect,
    private userService: UserService,
    private cartService: CartService,
    private baseURLService: BaseURLService,
    public signalrService: SignalrService,
    private auctionService: AuctionService
  ) { }
  async ngOnInit() {
    this.bidOrdersInfo = 0;
    this.auctionService.FindAllAuction().then(
      res => {
        const bidOrders = res as BidOrder[];
        let now = new Date();
        if(bidOrders.length>=1){
          bidOrders.forEach(element => {
            if(now < moment(element.bidEndTime, 'DD-MM-YYYY HH:mm:ss').toDate()){
              this.bidOrdersInfo +=1;
            }
          })      
        }
      },
      error => {
        console.log(error);
      }

    );
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    this.imageUrl = this.baseURLService.IMAGE_URL
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];
    if (this.user != null) {
      const result = await this.cartService.innerCart(this.user.id);
      this.cartItems = result['result'].length
    }
    console.log(this.user)
    
    setTimeout(() => {
      const hasDarkClass = document.body.classList.contains('dark');
      this.theme = hasDarkClass;
      this.conect.setData(this.theme);
    }, 500);
  }
  logOut() {
    const personId = parseInt(localStorage.getItem('personId') || '0', 10);
    if (personId) {
      // Gọi server để đăng xuất
      this.signalrService.hubConnection.invoke("logOut", personId)
        .then(() => {
          // Xóa dữ liệu người dùng và ngắt kết nối SignalR
          localStorage.removeItem('personId');
          this.signalrService.stopConnection(); // Ngắt kết nối SignalR
        })
        .catch(err => {
          console.error('Lỗi khi đăng xuất:', err);
        });
    }
    google.accounts.id.disableAutoSelect()
    sessionStorage.removeItem("loggedInUser")
    window.location.href = '/'


  }

  toggleTheme() {
    setTimeout(() => {
      const hasDarkClass = document.body.classList.contains('dark');
      this.theme = hasDarkClass;
      this.conect.setData(this.theme);
    }, 50);
  }
  login() {
    window.location.href = '/login'
  }
  register() {
    window.location.href = '/register'

  }
  sendMail() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes !'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.user != null) {
          this.userService.sendmail(this.user.email).then(
            () => {
              Swal.fire({
                icon: 'warning',
                title: 'An email to reset your password has been sent to you.',
                text: 'Please check your inbox (including spam) to complete the password reset process.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Open Email',
              }).then(() => {
                window.location.href = 'https://mail.google.com' // Open in new tab/window
              });
            },
            () => {
              Swal.fire({
                icon: 'error',
                title: 'Send Email Fail'
              })
            }
          )
        }

      }
    })

  }
}
