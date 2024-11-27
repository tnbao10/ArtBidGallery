
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { interval, Subscription, timestamp  } from 'rxjs';
import { ConectActive } from '../../services/conectActive';
import { AuctionService } from '../../services/auction.service';
import { BidOrder } from '../../entities/bidorder.entity';
import { ProductService } from '../../services/product.service';
import { ProductWithAttributes } from '../../entities/productwithattributes.entity';
import { BaseURLService } from '../../services/baseURL.service';
import { NgClass } from '@angular/common';
import moment from 'moment';
import { ProductWithSeller } from '../../entities/productwithseller.entity';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './auction.component.html',
  host:{
    'collision': 'AutionComponent'
  }
})
export class AuctionComponent implements OnInit {
  totalItems: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  productsToDisplay: any = []; // Array for displaying current page items

    auctionStartTime: Date;
    auctionEndTime: Date;
    auctionLifetime:number;
    auctionMin: number;
    auctionSec: number;
    source = interval(1000);
    subscription: Subscription;
    subscriptionstart:Subscription;
    subscriptionend:Subscription;
    onDisable:boolean
    auctionInformation:string;

    auctionProducts:any=[]
    imageUrl:any

  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private auctionService : AuctionService,
    private productService : ProductService,
    private baseURLService:BaseURLService,
  ){
    
  }
  async ngOnInit() {
    this.imageUrl=this.baseURLService.IMAGE_URL

    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.auctionProducts = []
    const auctionProductss = await this.auctionService.FindAllAuction() as BidOrder[];
    auctionProductss.forEach(async auctionProduct => {
      let product = await this.productService.findProductIdWithSeller(auctionProduct.productId) 
      let pro = product['result'] as ProductWithSeller 
      this.auctionProducts.push({
        id: auctionProduct.id,
        bidStartTime: moment(auctionProduct.bidStartTime, 'DD-MM-YYYY HH:mm:ss').toDate(),
        bidEndTime: moment(auctionProduct.bidEndTime, 'DD-MM-YYYY HH:mm:ss').toDate() ,
        bidBasePrice: auctionProduct.bidBasePrice,
        bidSoldPrice:auctionProduct.bidSoldPrice,
        productId: pro.id,
        productSeller: pro.username,
        productSellerAvatar: pro.avatar,
        productName:pro.name,
        productImage:pro.image,
        productSellerId:pro.sellerId,
        auctionInfomation:'',
        auctionHour:0,
        auctionMin:0,
        auctionSec:0
      })

    });
    

    this.totalItems = this.auctionProducts?.length || 0; // Assuming products length
    this.updateDisplayedProducts();
    console.log(this.auctionProducts)
    const now = new Date();
    
    this.auctionStartTime = new Date(); // September 20, 2024, 3:00 PM
    this.auctionStartTime.setTime(now.getTime()+10000)
    this.auctionLifetime = 10000;
    this.auctionEndTime = new Date(this.auctionStartTime);
    this.auctionEndTime.setTime(this.auctionEndTime.getTime() + this.auctionLifetime);
    // this.startInterval();
   

    this.subscription = interval(1000).subscribe(()=>{
      let now = new Date();
      this.auctionProducts.forEach(element => {

        if (element.bidStartTime > now) {
          element.auctionInfomation = 'Auction start in '
            let timeRemain =  element.bidStartTime.getTime() - now.getTime();
          console.log('Auction start in: '+timeRemain)

            element.auctionHour = Math.floor(timeRemain / 3600000);
            element.auctionMin = Math.floor((timeRemain % 3600000) / 60000);
            element.auctionSec = Math.floor((timeRemain % 60000) / 1000);
        
        } else if (element.bidEndTime < now) {
          element.auctionInfomation = 'Auction ended'

        } else {
          element.auctionInfomation = 'Time left: '
          let timeRemain = element.bidEndTime.getTime() - now.getTime();
          console.log('timeLeft: '+timeRemain)
          element.auctionHour = Math.floor(timeRemain / 3600000);
          element.auctionMin = Math.floor((timeRemain % 3600000) / 60000);
          element.auctionSec = Math.floor((timeRemain % 60000) / 1000);    
        }
        });
    })
    console.log(this.subscription)
   
  }
  startInterval(){
    this.subscription = interval(1000).subscribe(()=>{
      this.auctionProducts.forEach(element => {
        console.log(moment(element.bidStartTime, 'DD-MM-YYYY HH:mm:ss').toDate())
          
        });
        if(new Date() < this.auctionStartTime){
            this.auctionInformation = 'Auction start in ';
            this.onDisable = true;
            if(this.subscriptionend){
                this.subscriptionend.unsubscribe();
            }
            if(this.subscription){
                this.subscription.unsubscribe();
            }
            this.subscriptionstart = interval(1000).subscribe(() => this.timingCounter(new Date(), this.auctionStartTime,this.subscriptionstart));
            
        } else if(new Date() > this.auctionEndTime){
            this.auctionInformation = 'Auction ended';
            this.onDisable = true;
            if(this.subscription){
                this.subscription.unsubscribe();
            }
        } else {
            this.auctionInformation = 'Time left: ';
            this.onDisable = false;
            if(this.subscriptionstart){
                this.subscriptionstart.unsubscribe();
            }
            if(this.subscription){
                this.subscription.unsubscribe();
            }
            this.subscriptionend = interval(1000).subscribe(() => this.timingCounter(new Date(), this.auctionEndTime,this.subscriptionend));
            
        }
    })
  }
  timingCounter(start:Date, end:Date, subscription:Subscription){
    const timeRemain = end.getTime() - start.getTime();
    this.auctionMin = Math.floor(timeRemain / 60000);
    this.auctionSec = Math.floor((timeRemain % 60000) / 1000);
    if (timeRemain <= 1000) {
        // Auction has ended
        subscription.unsubscribe();
        this.startInterval();
      }
  }
  getvalue(evt:any){
    const timeValue = evt.target.value;
    const now = new Date();
    const selectedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...timeValue.split(':'));
    console.log(selectedTime);
  }
  truncate(text: string, length: number, suffix: any) {
    if (text.length > length) {
      // text = text.replace(/\s+/g, '')
      return text.substring(0, length) + suffix;
    }
    return text; 
  }
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const visiblePages = 5; // Adjust as needed
    const startPage = Math.max(this.currentPage - Math.floor(visiblePages / 2), 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);
    const pageNumbers: number[] = [];
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage; 

    this.productsToDisplay = this.auctionProducts.slice(startIndex, endIndex);
  }

  // Event handlers for pagination interactions (implement in your component)
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedProducts();
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  onNextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }
  next(){
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }
  // formatTimestamp(timestamp) {
  //   const date = new Date(timestamp);
  
  //   const year = date.getFullYear();

  //   const month = String(date.getMonth() + 1).padStart(2,   
  //  '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2,   
  //  '0');
  //   const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
  //   return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}.${milliseconds}`;   
  // }
}
