
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product.entity';
import { formatDate, NgClass } from '@angular/common';

import { ProductWithSeller } from '../../entities/productwithseller.entity';
import { UserService } from '../../services/user.service';
import { CartItem } from '../../entities/cartitem.entity';
import { User } from '../../entities/user.entity';
import { CartService } from '../../services/cart.service';
import { BaseURLService } from '../../services/baseURL.service';
import { Wishlist } from '../../entities/wishlist.entity';
import { WishlistService } from '../../services/wishlist.service';
import Swal from 'sweetalert2';
import { Category } from '../../entities/category.entity';
import { Review } from '../../entities/review.entity';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,NgClass,ReactiveFormsModule],
  templateUrl: './home.component.html',
  host:{
    'collision': 'HomeComponent'
  }
})
export class HomeComponent implements OnInit {
  // Pagination variables
  totalItems: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  totalPages:number = 0;
  userId:any
  proId:number
  user:any
  wishlists:any
  btnWishlists:any
  wishlistResult:any
  productsToDisplay: any = []; // Array for displaying current page items
  createWishList:FormGroup
  productswithseller: any
  wishlistsSelect:any
  artName:any
  // min:any
  max:any
  imageUrl:any
  // wishlists = new Wishlist()
  @ViewChild('input-number-min') min: ElementRef;
  categories: Category[];
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private userService:UserService,
    private cartService:CartService,
    private wishlistService:WishlistService,
    private baseURLService:BaseURLService,
    private formBuilder : FormBuilder
  ){
    this.createWishList = this.formBuilder.group({
      userId:[''],
      name:['',[Validators.required]],
      productId:[''],
      createdAt:['']
    })
  }
  async ngOnInit(){
    this.productswithseller = []
    this.imageUrl=this.baseURLService.IMAGE_URL
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))) as User
    this.user = userResult['result']
    if(this.user!=null){
      this.userId = this.user.id
    }
    const wishlistResult = await this.wishlistService.findallwishlist(this.userId) as Wishlist[]
    this.wishlists = wishlistResult['result']
    this.productService.findallwithseller().then(
      async res => {
        const productswithsellerResult = res as ProductWithSeller[];
        productswithsellerResult.reverse()
        for(let i=0; i< productswithsellerResult.length; i++){
          if(productswithsellerResult[i].deletedAt == null){
            this.productswithseller.push({
              id: productswithsellerResult[i].id,
              sellerId: productswithsellerResult[i].sellerId,
              name:productswithsellerResult[i].name,
              description:productswithsellerResult[i].description,
              categoryId:productswithsellerResult[i].categoryId,
              price:productswithsellerResult[i].price,
              quantity:productswithsellerResult[i].quantity,
              image:productswithsellerResult[i].image,
              createdAt:productswithsellerResult[i].createdAt,
              deletedAt:productswithsellerResult[i].deletedAt,
              username: productswithsellerResult[i].username,
              avatar:productswithsellerResult[i].avatar,
              liked:false
          });
          }
          
        }
        this.totalItems = this.productswithseller?.length || 0; // Assuming products length
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        console.log(this.totalPages)
        this.updateDisplayedProducts();

        for(let i =0; i< this.productswithseller.length; i++){
          for(let j =0;j<this.wishlists.length;j++){
            const product = await this.productService.findProductId(this.wishlists[j].productId) as ProductWithSeller
            if(product.id == this.productswithseller[i].id){
              this.productswithseller[i].liked = true;
              break;
            }
          }
        }
        console.log(this.productswithseller)
        
         // Update displayed products on initial load
      },
      error => {
        console.log(error)
      })
    

    // this.productService.findallwithseller().then(
    //   async res => {
    //     const productswithsellerResult = res as ProductWithSeller[];
        
    //     for(let i=0;i<this.productswithseller.length; i++){
    //       for(let j=0 ; j<this.wishlists.length; j++){
    //         const product = await this.productService.findProductIdWithSeller(this.wishlists[j].productId) as ProductWithSeller[];
    //         if(product['result'].id == this.productswithseller[i].id){
    //           this.productswithseller[i].liked = true
    //           break
    //         }
    //       }
    //     }     
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    console.log(this.productswithseller)
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.productService.findallcategory().then(
      res => {
        this.categories = res as Category[];
      }
    )
    this.conect.addStyle("src/plugins/src/noUiSlider/nouislider.min.css")
    this.conect.addStyle("src/assets/css/light/scrollspyNav.cs")
    this.conect.addStyle("src/plugins/css/light/noUiSlider/custom-nouiSlider.css")
    this.conect.addStyle("src/plugins/css/light/bootstrap-range-Slider/bootstrap-slider.css")
    this.conect.addStyle("src/assets/css/dark/scrollspyNav.cs")
    this.conect.addStyle("src/plugins/css/dark/noUiSlider/custom-nouiSlider.css")
    this.conect.addStyle("src/plugins/css/dark/bootstrap-range-Slider/bootstrap-slider.css")
    this.conect.addStyle("src/assets/css/light/elements/custom-pagination.css")
    this.conect.addStyle("src/assets/css/dark/elements/custom-pagination.css")
    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");

    this.conect.addScriptAsync("src/plugins/src/noUiSlider/nouislider.min.js")


    this.conect.addScriptAsync("src/plugins/src/noUiSlider/custom-nouiSlider.js")
    
    
    this.wishlistsSelect = new Set(wishlistResult['result'].map(wishlist => wishlist.name));
    // this.conect.reloadPage()
    
  }
  selectValueLowHigh(evt:any){
    const inputmin = document.getElementById('input-number-min') as HTMLInputElement  
    const inputmax = document.getElementById('input-number') as HTMLInputElement
    this.productService.sortbypricelowhigh(evt.target.value,parseFloat(inputmin.value),parseFloat(inputmax.value)).then(
      res => {
        this.productswithseller = res as ProductWithSeller[];
        this.totalItems = this.productswithseller?.length || 0; // Assuming products length
        this.currentPage = 1;
        this.updateDisplayedProducts();
      },
      error => {
        console.log(error);
      }
    )
  }
  selectValue(){
    const inputmin = document.getElementById('input-number-min') as HTMLInputElement  
    const inputmax = document.getElementById('input-number') as HTMLInputElement

    this.productService.sortbyprice(parseFloat(inputmin.value),parseFloat(inputmax.value)).then(
      res => {
        this.productswithseller = res as ProductWithSeller[];
        
        this.totalItems = this.productswithseller?.length || 0; // Assuming products length
        this.currentPage = 1;
        this.updateDisplayedProducts();
      },
      error => {
        console.log(error);
      }
    );
  }
  searchProduct(evt:any){
    if(evt.target.value == '' || evt.target.value == null){
      this.productService.findallwithseller().then(
        res => {
          this.productswithseller = res as ProductWithSeller[];
          this.productswithseller.reverse()

          this.totalItems = this.productswithseller?.length || 0; // Assuming products length
          this.currentPage = 1;
          this.updateDisplayedProducts(); // Update displayed products on initial load
          evt.target.value=''
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      this.productService.searchByKeyword(evt.target.value).then(
        res => {
          this.productswithseller = res as ProductWithSeller[];
          this.totalItems = this.productswithseller?.length || 0; // Assuming products length
          this.currentPage = 1;
          this.updateDisplayedProducts();
          evt.target.value=''
        },
        error => {
          console.log(error);
        }
      )
    }
    
  }
  truncate(text: string, length: number, suffix: any) {
    if (text.length > length) {
      // text = text.replace(/\s+/g, '')
      return text.substring(0, length) + suffix;
    }
    return text; 
  }
  getPageNumbers(): number[] {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const visiblePages = 5; // Adjust as needed
    const startPage = Math.max(this.currentPage - Math.floor(visiblePages / 2), 1);
    const endPage = Math.min(startPage + visiblePages - 1, this.totalPages);
    const pageNumbers: number[] = [];
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage; 

    this.productsToDisplay = this.productswithseller.slice(startIndex, endIndex);
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
  shouldShowFirstEllipsis(): boolean {
    const visiblePages = 5; // Adjust as needed
    // this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return visiblePages > 1
  }
  isFirstPageVisible(): boolean {
    const visiblePages = 5; // Adjust as needed

    return this.currentPage === 1 || // Show on current page is last page
              (visiblePages + 2) > 1; // Show if more than 2 pages hidden
  }
  goToFirstPage(){
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }
  shouldShowEllipsis(): boolean {
    const visiblePages = 5; // Adjust as needed
    // this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return visiblePages < this.totalPages
  }
  isLastPageVisible(): boolean {
    const visiblePages = 5; // Adjust as needed

    return this.currentPage === this.totalPages || // Show on current page is last page
           this.totalPages > (visiblePages + 2); // Show if more than 2 pages hidden
  }
  goToLastPage(){
    this.currentPage = this.totalPages;
    this.updateDisplayedProducts();
  }
  sortbycategory(event:any){
    if(event.target.value == '' || event.target.value == null){
      this.productService.findallwithseller().then(
        res => {
          this.productswithseller = res as ProductWithSeller[];
          this.productswithseller.reverse()

          this.totalItems = this.productswithseller?.length || 0; // Assuming products length
          this.currentPage = 1;
          this.updateDisplayedProducts(); // Update displayed products on initial load
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
    this.productService.findbycategoryid(event.target.value).then(
      res=>{
          this.productswithseller = res as ProductWithSeller[];
          this.totalItems = this.productswithseller?.length || 0; // Assuming products length
          this.currentPage = 1;
          this.updateDisplayedProducts();
      }
    )
   }
  }
  async addToCart(productID:any){
    await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      async res=>{
        if(res['result']){
          this.user = res['result'] as User;
          const product = await this.productService.findProductId(productID) as Product
          // const cart = await this.cartService.findcartbyproductid(productID) as CartItem
          const cartItem = new CartItem();
          cartItem.cartId = this.user.id;
          cartItem.productId = productID;
          cartItem.quantity = 1;
          cartItem.createdAt = formatDate(new Date(),'dd-MM-yyyy','en-us');
          console.log(cartItem)
          console.log(product)
          // console.log(cart['result'])
          // if(cart['result']==null){
            if(product.quantity<1){
              Swal.fire({
                icon: 'error',
                title: 'Product quantity is not sufficient',
              })
            }
            else{
              console.log(product)
              this.cartService.addToCart(cartItem).then(
                res => {
                  if(res['result']){
                    Swal.fire({
                      icon: 'success',
                      title: 'Add To Cart Success',
                    })
                  }
                  else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Add To Cart Fail',
                    })
                  }
                },
                error => {
                  console.log(error);
                }
              )
            }
            
          // }
          // else{
          //   if(product.quantity <= cart['result'].quantity){
          //     Swal.fire({
          //       icon: 'error',
          //       title: 'Product quantity is not sufficient',
          //     })
          //   }
          //   else{
          //     console.log("đã add")
          //     this.cartService.addToCart(cartItem).then(
          //       res => {
          //         if(res['result']){
          //           Swal.fire({
          //             icon: 'success',
          //             title: 'Add To Cart Success',
          //           })
          //         }
          //         else{
          //           Swal.fire({
          //             icon: 'error',
          //             title: 'Add To Cart Fail',
          //           })
          //         }
          //       },
          //       error => {
          //         console.log(error);
          //       }
          //     )
          //   }
          // }
          
          
          
          
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  chooseProduct(productID:number){
    this.productService.findProductId(productID).then(
      res => {
        const pro = res as Product
        if(pro.quantity<1){
          const popup = document.querySelector(".no-add-wl") as HTMLElement
          popup.style.display = "none";
          Swal.fire({
            icon: 'error',
            title: 'Product quantity is not sufficient',
          }).then(async()=>{  
            const backdrop = document.querySelector('.modal-backdrop');
            backdrop.parentNode.removeChild(backdrop);
            const body = document.body
            body.style.overflowY = 'scroll';
          })
        }
        else{
          if(this.wishlists!=null){
            for(let i = 0; i < this.wishlists.length;i++){
              if(this.wishlists[i].productId == productID){
                const popup = document.querySelector(".no-add-wl") as HTMLElement
                popup.style.display = "none";
                Swal.fire({
                  icon: 'info',
                  title: 'Item Already In WishList',
                }).then(async()=>{  
                  const backdrop = document.querySelector('.modal-backdrop');
                  backdrop.parentNode.removeChild(backdrop);
                  const body = document.body
                  body.style.overflowY = 'scroll';
                })
                // this.proId = null
              }
            }
          }
          this.proId = productID
        }
      }
    )
    
  }
  chooseWishList(event:any){
    

    this.createWishList = this.formBuilder.group({
      userId:[this.userId],
      name:[event.target.value,[Validators.required]],
      productId:[this.proId],
      createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-us')]
    })
  }
  newWishList(event:any){
    this.createWishList = this.formBuilder.group({
      userId:[this.userId],
      name:[event.target.value,[Validators.required]],
      productId:[this.proId],
      createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-us')]
    })
  }
  async addWishList(){
    console.log(this.createWishList.value)
    console.log("add: "+this.proId)
    let wishlist =  JSON.stringify(this.createWishList.value)
    let formdata = new FormData();
    formdata.append('wishListInfo',wishlist);
    this.wishlistService.addToWishList(formdata).then(
      res => {
        if(res['result']){
          console.log('add success');
          Swal.fire({
            icon: 'success',
            title: 'Add WishList Success',
          }).then(()=>{
            window.location.href = 'user/home'
          })
        }
        else{
          console.log('add failed')
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
