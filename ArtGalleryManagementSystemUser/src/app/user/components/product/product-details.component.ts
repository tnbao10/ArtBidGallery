
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { param } from 'jquery';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product.entity';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { CartItem } from '../../entities/cartitem.entity';
import { formatDate } from '@angular/common';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { BaseURLService } from '../../services/baseURL.service';
import { ProductWithAttributes } from '../../entities/productwithattributes.entity';
import { ProductWithSeller } from '../../entities/productwithseller.entity';
import { Review } from '../../entities/review.entity';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './product-details.component.html',
  host:{
    'collision': 'ProductDetailsComponent'
  }
})
export class ProductDetailsComponent implements OnInit {
  product:ProductWithAttributes
  productId: string
  addsuccess:boolean
  userId:any
  user:any
  imageUrl:any
  buyItems: any = []
  buyQuantity: number
  reviews:any
  rating:number=0
  fivestar:number=0
  fourstar:number=0
  threestar:number=0
  twostar:number=0
  onestar:number=0
  ratingcount:any
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private baseURLService:BaseURLService,
    private elementRef: ElementRef
  ){
    
  }
  async ngOnInit() {
    this.buyQuantity = 1;
    this.imageUrl=this.baseURLService.IMAGE_URL
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.addsuccess = false;
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/leaflet/leaflet.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
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
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    
    this.conect.addScriptAsync("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
    this.conect.addScriptAsync("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.addScriptAsync("src/plugins/src/splide/splide.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/ecommerce-details.js")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    // this.conect.reloadPage()
    this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        this.user = res['result'] as User
        if(this.user!=null){
          this.userId = this.user.id
        }
      })
    this.activatedRoute.paramMap.subscribe(
      async params => {
        this.productId = params.get('productId');
        await this.productService.findProductIdWithAttributes(parseInt(params.get('productId'))).then(
          res => {
            if(res){
              this.product = res as ProductWithAttributes
              console.log(this.product);
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Árt Has Been Deleted',
              }).then(()=>window.location.href='user/home')
            }            
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Árt Has Been Deleted',
            }).then(()=>window.location.href='user/home')
          }
        )
      },
      error => {
        console.log(error)
      }
    )
    const reviewsResult = await this.productService.findallreviewbyproid(parseInt(this.productId))
    this.reviews = reviewsResult['result'] as Review[]
    this.reviews.forEach((element: { rating: string; }) => {
      // console.log(element.rating)
      if(parseInt(element.rating) == 5){
        this.fivestar = this.fivestar + 1
      }
      if(parseInt(element.rating) == 4){
        this.fourstar = this.fourstar + 1
      }
      if(parseInt(element.rating) == 3){
        this.threestar = this.threestar + 1
      }
      if(parseInt(element.rating) == 2){
        this.twostar = this.twostar + 1
      }
      if(parseInt(element.rating) == 1){
        this.onestar = this.onestar + 1
      }
      this.rating += parseInt(element.rating)
    });
    // for(let i=0;i<this.reviews.length;i++){
    //   this.rating += this.reviews[i].rating
    // }
    console.log(this.rating)
    this.ratingcount = this.reviews.length
    this.rating = parseFloat((this.rating / this.reviews.length).toFixed(2))
    // const star5 = document.querySelector("#star-five") as HTMLElement
    // star5.style.width = (this.fivestar/this.reviews.length)*100+"%"
    // const star4 = document.querySelector("#star-four") as HTMLElement
    // star4.style.width = (this.fourstar/this.reviews.length)*100+"%"
    // const star3 = document.querySelector("#star-three") as HTMLElement
    // star3.style.width = (this.threestar/this.reviews.length)*100+"%"
    // const star2 = document.querySelector("#star-two") as HTMLElement
    // star2.style.width = (this.twostar/this.reviews.length)*100+"%"
    // const star1 = document.querySelector("#star-one") as HTMLElement
    // star1.style.width = (this.onestar/this.reviews.length)*100+"%"
    // console.log(this.star5)
    
    console.log(this.reviews)
    console.log(this.rating)
    console.log(this.ratingcount)

  }
  addQuantity(){
    if(this.buyQuantity < this.product.quantity){
      this.buyQuantity +=1;
    }
  }
  minusQuantity(){
    if(this.buyQuantity > 1){
      this.buyQuantity -=1;
    }
  }
  async addToCart(productID:any){
    await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      async res=>{
        if(res['result']){
          this.user = res['result'] as User;
          const cartItem = new CartItem();
          cartItem.cartId = this.user.id;
          cartItem.productId = productID;
          cartItem.quantity = this.buyQuantity;
          cartItem.createdAt = formatDate(new Date(),'dd-MM-yyyy','en-us');
          if(this.product.quantity < cartItem.quantity){
            Swal.fire({
              icon: 'error',
              title: 'Product quantity is not sufficient',
            })
          }
          else{
            await this.cartService.addToCart(cartItem).then(
              res => {
                if(res['result']){
                  console.log('add success');
                  this.addsuccess = true;               
                      Swal.fire({
                        icon: 'success',
                        title: 'Add success',
                    })                                         
                  
                  // window.location.href = 'user/home'
                }
                else{
                  console.log('add failed');
                }
              },
              error => {
                console.log(error);
              }
            )
          }
          
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  async BuyItems(){
    console.log(this.user);
    this.buyItems=[]
    sessionStorage.setItem('buyItems',JSON.stringify(this.buyItems))
    await this.productService.findProductIdWithSeller(parseInt(this.productId)).then(
      res => {
        const product = res['result'] as ProductWithSeller
        
        this.buyItems.push(
          {
              id : product.id,
              name:product.name,           
              categoryId:product.categoryId,
              image:product.image,
              price:product.price,
              quantity: this.buyQuantity,
              cardid : this.userId,
              avatar: product.avatar,
              username: product.username,
          }
        )
        // console.log(this.buyItems)
        if(product.quantity < this.buyItems[0].quantity){
          Swal.fire({
            icon: 'error',
            title: 'Product quantity is not sufficient',
          })
        }
        else{
          if(this.buyItems.length >0){
            sessionStorage.setItem('buyItems', JSON.stringify(this.buyItems))
            // console.log(sessionStorage.getItem('buyItems'));
            window.location.href = '../user/invoice'
          }
        }
        
      },
      error =>{
        console.log(error);
      }
    )
    
  }
  contactUs(){
    window.location.href = '/user/contact-us'
  }
  login(){ 
    Swal.fire({
      title: 'You Love It ?',
      text: 'Please Login !',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes !',
      cancelButtonText: 'No !',
      reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'
      }
      else{
        window.location.href = '/'

      }
    })
  }
}

