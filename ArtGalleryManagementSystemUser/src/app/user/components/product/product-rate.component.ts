import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConectActive } from '../../services/conectActive';
import { CartService } from '../../services/cart.service';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';
import { BaseURLService } from '../../services/baseURL.service';
import { Order } from '../../entities/order.entity';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Review } from '../../entities/review.entity';
// import {WebcamInitError, WebcamModule} from 'ngx-webcam';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink,ReactiveFormsModule],
  templateUrl: './product-rate.component.html',
  // styleUrls: ['./product-rate.component.css']
})
export class ProductRateComponent implements OnInit, AfterViewInit {
  star:any
  serviceStar:any
  reviewForm:FormGroup
  imageUrl:any
  user:any
  orders:any
  seller:any
  productReviewName:string
  productReviewImage:string
  productId:number
  reviews:any
  reviewed:any
  createAt:any
  constructor(
    private conect : Conect,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private conectActive: ConectActive,
    private cartService:CartService,
    private productService : ProductService,
    private userService : UserService,
    private baseURLService : BaseURLService
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: ['',Validators.required],
      reviewText:['',Validators.required],
      productId: ['']
    })
  }

  async ngOnInit(){
    this.imageUrl=this.baseURLService.IMAGE_URL

    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    

    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    // this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")

    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    
    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-list.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addScriptAsync("src/assets/js/custom.js")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/assets/css/dark/apps/invoice-list.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/product-rate.css")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/invoice-list.js")


    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];
    if(this.user != null){
      const result = await this.cartService.findallorder(this.user.id);
      this.orders = result['result'] as Order[]
    }
    // this.orders.forEach(async (i,index) => {
    //     const reviewedResult = await this.productService.findreviewbyproId(i.productId)
    //     this.reviewed = reviewedResult['result'] as Review[]
    //     console.log(this.reviewed)
    //   });
    // console.log(this.orders)
    // console.log(this.orders.productId)
    this.reviewForm = this.formBuilder.group({
      rating: ['',Validators.required],
      reviewText:['',Validators.required],
      productId: ['']
    })
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      // Product rating stars
      document.querySelectorAll('.star-rating.product-stars i[data-star]').forEach((starElement) => {
        starElement.addEventListener('click', () => {
           // Ghi log khi ngôi sao được nhấn
          this.star = starElement.getAttribute('data-star');
          const stars = starElement.parentElement?.children;
          if (stars) {
            for (let i = 0; i < stars.length; i++) {
              stars[i].classList.remove('text-warning');
              stars[i].classList.add('text-secondary');
  
              if (i < Number(this.star)) {
                stars[i].classList.remove('text-secondary');
                stars[i].classList.add('text-warning');
              }
            }
          }
         
        });
        // this.reviewForm = this.formBuilder.group({
        //   rating: [this.star,Validators.required],
        //   reviewText:['',Validators.required],
        //   productId: [this.productId]
        // })
      });
    });
    
  }
  Buy(){
    window.location.href = 'user/home'
  }
 showReview(productName:any,productImage:any,proId:any,createdAt:any){
  // console.log(createdAt)
      this.productService.findreviewbyproId(proId,this.user.id,createdAt).then(
        res=>{
          if(res['result']!=null){
            Swal.fire({
              icon: 'warning',
              title: 'Árt Has Been Evaluated',
            }).then(
              ()=>{
                const popup = document.querySelector(".no-add-rw") as HTMLElement
                popup.style.display = "none"
                const backdrop = document.querySelector('.modal-backdrop');
                backdrop.parentNode.removeChild(backdrop);
                const body = document.body
                body.style.overflowY = 'scroll'
                // window.location.href = 'user/product-rate'
              }
            )
          }
          else{
            this.reviewForm = this.formBuilder.group({
              // rating: [this.star,Validators.required],
              reviewText:['',Validators.required],
              productId: [proId],
              createdAt: [createdAt]
            })
            this.productReviewName = productName
            this.productReviewImage = productImage
            this.productId = proId
            this.createAt = createdAt
          }
        },
        ()=>{
          this.reviewForm = this.formBuilder.group({
            // rating: [this.star,Validators.required],
            reviewText:['',Validators.required],
            productId: [proId],
            createdAt: [createdAt]
          })
          this.productReviewName = productName
          this.productReviewImage = productImage
          this.productId = proId
          this.createAt = createdAt
        }
      )
      
    
  }
  send(){
    this.reviewForm.value.rating = this.star==null?'0':this.star
    this.reviewForm.value.userId = this.user.id
    this.reviewForm.value.status = true
    console.log(this.reviewForm.value)
    let r =  JSON.stringify(this.reviewForm.value)
    let formdata = new FormData();
    formdata.append('reviewinfor',r);
    this.productService.addreview(formdata).then(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Review Successfully',
        }).then(
          ()=>window.location.href = 'user/product-rate'
        )
      }
    )
  }
  // handleInitError(error: WebcamInitError): void {
  //   if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
  //     console.warn("Camera access was not allowed by user!");
  //   }
  // }
  close(){
    
    window.location.href = 'user/product-rate'
  }
}
