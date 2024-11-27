
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { asyncScheduler, interval, Observable, Subscription } from 'rxjs';
import { CommonModule, formatDate } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { ConectActive } from '../../services/conectActive';
import { ProductService } from '../../services/product.service';
import { AuctionService } from '../../services/auction.service';
import { BidOrder } from '../../entities/bidorder.entity';
import { ProductWithAttributes } from '../../entities/productwithattributes.entity';
import moment from 'moment';
import { BaseURLService } from '../../services/baseURL.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { BidOrderUser } from '../../entities/bidorderuser.entity';
import Swal from 'sweetalert2';
import { error } from 'jquery';
import {IPayPalConfig, NgxPayPalModule, } from 'ngx-paypal';
import { BidOrderDto2 } from '../../entities/bidorder2.entity';
@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxPayPalModule],
  templateUrl: './auction-details.component.html',
  host:{
    'collision': 'AuctionDetailsComponent'
  }
})
export class AuctionDetailsComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  subscription: Subscription;
  imageUrl:any

  theme: boolean;
  bidInfo: any;
  productInfo: any;
  bidPlus:number;
  currentBid:number;

  bidding:any;
  bidHistory:any
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private auctionService: AuctionService,
    private baseURLService:BaseURLService,
    private userService:UserService

  ){
    
  }
  async ngOnInit() {
    this.imageUrl=this.baseURLService.IMAGE_URL
    
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    setTimeout(() => {
      this.conect.getData().subscribe(data => {
        this.theme = data;
      });
    }, 1000);
    this.bidInfo = {};
    this.activatedRoute.paramMap.subscribe(
      async params => {
        const bidId = params.get('bidId');
        const bidinfo = await this.auctionService.FindAuctionById(parseInt(bidId)) as BidOrder;
        this.productInfo = await this.productService.findProductIdWithAttributes(bidinfo.productId) as ProductWithAttributes
        this.bidInfo = {
          id: bidinfo.id,
          bidStartTime: moment(bidinfo.bidStartTime, 'DD-MM-YYYY HH:mm:ss').toDate(),
          bidEndTime: moment(bidinfo.bidEndTime, 'DD-MM-YYYY HH:mm:ss').toDate() ,
          bidBasePrice: bidinfo.bidBasePrice,
          bidSoldPrice:bidinfo.bidSoldPrice,
          incrementInPrice:bidinfo.incrementInPrice,
          IncrementInTime:bidinfo.IncrementInTime,
          productId: this.productInfo.id,
          productSeller: this.productInfo.username,
          productSellerAvatar: this.productInfo.avatar,
          productName:this.productInfo.name,
          productImage:this.productInfo.image,
          productSellerId:this.productInfo.sellerId,
          auctionInfomation:'',
          auctionHour:0,
          auctionMin:0,
          auctionSec:0
        }
        this.bidPlus = this.bidInfo.incrementInPrice
        this.currentBid = this.bidInfo.bidBasePrice
      }
      
    )
   

    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")


    this.conect.addStyle("src/assets/css/light/components/accordions.css")
    this.conect.addStyle("src/assets/css/dark/components/accordions.css")
    this.conect.addStyle("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css")
    this.conect.addStyle("src/plugins/src/glightbox/glightbox.min.css")
    this.conect.addStyle("src/plugins/src/splide/splide.min.css")
    this.conect.addStyle("src/assets/css/light/components/tabs.css")
    this.conect.addStyle("src/assets/css/light/apps/ecommerce-details.css")
    this.conect.addStyle("src/assets/css/dark/components/tabs.css")
    this.conect.addStyle("src/assets/css/dark/apps/ecommerce-details.css")
    

    this.conect.addScriptAsync("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
    this.conect.addScriptAsync("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.addScriptAsync("src/plugins/src/splide/splide.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/ecommerce-details.js")
    
    // this.conect.reloadPage()

    this.conect.getData().subscribe(data => {
      this.theme = data;
    });
    this.subscription = interval(1000).subscribe(async ()=>{
      let now = new Date();
      if(this.bidInfo!=null){
      if (this.bidInfo.bidStartTime > now) {
        this.bidInfo.auctionInfomation = 'Auction start in '
        let timeRemain = now.getTime() - this.bidInfo.bidStartTime.getTime();
        console.log('Auction start in: '+timeRemain)

        this.bidInfo.auctionHour = Math.floor(timeRemain / 3600000);
        this.bidInfo.auctionMin = Math.floor((timeRemain % 3600000) / 60000);
        this.bidInfo.auctionSec = Math.floor((timeRemain % 60000) / 1000);
      
      } else if (this.bidInfo.bidEndTime < now) {
        this.bidInfo.auctionInfomation = 'Auction ended'

      } else {
        this.bidInfo.auctionInfomation = 'Time left: '
        let timeRemain = this.bidInfo.bidEndTime.getTime() - now.getTime();
        console.log('timeLeft: '+timeRemain)
        this.bidInfo.auctionHour = Math.floor(timeRemain / 3600000);
        this.bidInfo.auctionMin = Math.floor((timeRemain % 3600000) / 60000);
        this.bidInfo.auctionSec = Math.floor((timeRemain % 60000) / 1000);    
      }
    }
    })
    this.findHistory();
  }
  async findHistory(){
    this.bidHistory = []
    let bidhistory = await this.auctionService.FindAllBidOrderUserById(this.bidInfo.id) as BidOrderUser[]
    bidhistory.forEach(async bid=> {
      let max:number = 0
      if(max < bid.bidTransactionAmount){
        max = bid.bidTransactionAmount
      }
      let userResult = await this.userService.findbyid(bid.userId);
      let user= userResult['result'] as User
      this.bidHistory.push({
        bidOrderUserId: bid.bidOrderUserId,
        userId: bid.userId,
        bidTransactionTime: bid.bidTransactionTime,
        bidTransactionAmount: bid.bidTransactionAmount,
        username: user.username,
        avatar: user.avatar
      })
      this.currentBid = max;
    })
  }
  raiseBid(){
    if((this.bidPlus+this.currentBid) < this.bidInfo.bidSoldPrice){   
      if(!((this.bidPlus+this.currentBid+this.bidInfo.incrementInPrice) >= this.bidInfo.bidSoldPrice)){
        this.bidPlus += this.bidInfo.incrementInPrice
      }
    }
  }

  lowerBid(){
    if(this.bidPlus > this.bidInfo.incrementInPrice){   
      this.bidPlus -= this.bidInfo.incrementInPrice
      if((this.bidPlus < this.bidInfo.incrementInPrice)){
        this.bidPlus = this.bidInfo.incrementInPrice
      }
    }
  }
  async Bid(){
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    const user = userResult['result'] as User
    if(this.bidInfo.productSellerId == user.id){
      Swal.fire({
        icon: 'error',
        title: 'can not bid your own product',
    })
    } else {
      const bidOrderUser = new BidOrderUser();
      bidOrderUser.bidOrderUserId = this.bidInfo.id
      bidOrderUser.userId = user.id
      bidOrderUser.bidTransactionTime = formatDate(new Date(),'dd-MM-yyyy HH:mm:ss', 'en-GB')
      bidOrderUser.bidTransactionAmount = (this.bidPlus+this.currentBid)
      this.auctionService.CreateBidOrderUser(bidOrderUser).then(
        res => {
          if(res['result']){
            Swal.fire({
              icon: 'success',
              title: 'Bid success, please watch the bid history',
          }).then( async()=>{
            this.bidHistory = []
            const bidhistory = await this.auctionService.FindAllBidOrderUserById(this.bidInfo.id) as BidOrderUser[]
            bidhistory.forEach(async bid=> {
              let max:number = 0
              if(max < bid.bidTransactionAmount){
                max = bid.bidTransactionAmount
              }
              let userResult = await this.userService.findbyid(bid.userId);
              let user= userResult['result'] as User
              this.bidHistory.push({
                bidOrderUserId: bid.bidOrderUserId,
                userId: bid.userId,
                bidTransactionTime: bid.bidTransactionTime,
                bidTransactionAmount: bid.bidTransactionAmount,
                username: user.username,
                avatar: user.avatar
              })
              this.currentBid = max;
              this.bidPlus = this.bidInfo.incrementInPrice
            })
          })    
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Bid failed',
          })    
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: error,
        })    
        }
      )
    }
    }
    usePay(){
      this.initConfig();
    }
    private initConfig(): void {
        const bidinfomation = {         
            Name: this.bidInfo.productName,
            Price:this.bidInfo.bidSoldPrice,
            quantity: 1       
        }
        this.payPalConfig = {
            clientId: 'Ae6Y-DSVMPCs7f8-GdUCFkW5bDRL9pnrSOz4SVwwWpBzexBF9MBrtb-Vt6J6DUBX3aVPrLAR6JWWpgsX',
            // for creating orders (transactions) on server see
            // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
            createOrderOnServer: (data) => fetch('http://localhost:5204/createpayment',{
              method: "post",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify([bidinfomation])
            })
                .then((res) => res.json())
                .then((order) => order.token),
            authorizeOnServer: (approveData:any) => {
              console.log(approveData);
                return fetch('http://localhost:5204/executepayment', {
                method: 'post',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  PayerId: approveData.payerID,
                  PaymentId: approveData.paymentID
                })
              }).then((res) => {
                this.saveBid()
                return res.json();
              }).then((details) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Payment sucessfully' ,
                }).then(() =>{}

                )
              });
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                // this.showCancel = true;
            },
            onError: err => {
                console.log('OnError', err);
                // this.showError = true;
            },
            onClick: (data, actions) => {
              console.log(data);
                console.log('onClick', data, actions);
                // this.resetStatus();
          },
      };     
    }

    async saveBid(){
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    const user = userResult['result'] as User
    const bidOrderUser = new BidOrderUser();
    bidOrderUser.bidOrderUserId = this.bidInfo.id
    bidOrderUser.userId = user.id
    bidOrderUser.bidTransactionTime = formatDate(new Date(),'dd-MM-yyyy HH:mm:ss', 'en-GB')
    bidOrderUser.bidTransactionAmount = this.bidInfo.bidSoldPrice
    await this.auctionService.CreateBidOrderUser(bidOrderUser).then(
      async res => {
        const bidOrderDto = new BidOrderDto2();
        bidOrderDto.bidStamp = ((new Date()).getTime()).toString();
        bidOrderDto.id = (this.bidInfo.id).toString();
        console.log(bidOrderDto)
        await this.auctionService.UpdateBidOrder(bidOrderDto).then(
          res =>{
    
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: error ,
            })
          }
        )
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error ,
        })
      }
    )

   
    }
}
