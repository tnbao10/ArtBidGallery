import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductWithSeller } from '../../entities/productwithseller.entity';
import { ProductService } from '../../services/product.service';
import { BaseURLService } from '../../services/baseURL.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { AuctionService } from '../../services/auction.service';
import { formatDate } from '@angular/common';
import {} from 'html-duration-picker'

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule, ReactiveFormsModule],
  templateUrl: './auction-create.component.html',
  host:{
    'collision': 'AuctionCreateComponent'
  }
})
export class AuctionCreateComponent {
  bidForm: FormGroup;
  imageUrl:any
  products:any;
  auctionproductsresult:any;
  time:any;
  constructor(
    private conect : Conect,
    private activatedRoute :ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private baseURLService:BaseURLService,
    private userService:UserService,
    private auctionService:AuctionService,
    private formBuilder: FormBuilder
  ){
    this.bidForm = this.formBuilder.group({
      bidStartTime:['',[
        Validators.required
      ]],
      bidEndTime:['',[
        Validators.required
      ]],
      bidBasePrice:['',[
        Validators.required
      ]],
      bidSoldPrice:['',[
        Validators.required
      ]],
      incrementInPrice:['',[
        Validators.required
      ]],
      IncrementInTime:['',[
        Validators.required
      ]],
    })

  }

  async ngOnInit() {
    this.imageUrl=this.baseURLService.IMAGE_URL

    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.products=[];
    const auctionproducts = await this.productService.findallauctionproductwithseller();
    this.auctionproductsresult = auctionproducts as ProductWithSeller[];
    for(let i =0; i< this.auctionproductsresult.length; i++){
      const product = this.auctionproductsresult[i];
      
      const checkdelete = await this.userService.findbyid(product.sellerId)
      if(checkdelete['result'].deletedAt == null){
        this.products.push({
          id : product.id,
          name:product.name,           
          categoryId:product.categoryId,
          image:product.image,
          price:product.price,
          quantity: product.quantity,
          createdAt: product.createdAt,
          avatar: product.avatar,
          username: product.username,
          selectedindex: i,
          selected:false
        });
      }
    }

    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/fullcalendar.min.js")
    this.conect.removeScript("src/plugins/src/uuid/uuid4.min.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/custom-fullcalendar.js")
    this.conect.removeScript("src/plugins/src/apex/apexcharts.min.js")
    this.conect.removeScript("src/assets/js/dashboard/dash_1.js")
    this.conect.removeStyle("src/plugins/src/editors/quill/quill.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-create.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImagePreview.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageCrop.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageResize.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepondPluginFileValidateSize.min.js")
    this.conect.removeScript("src/plugins/src/tagify/tagify.min.js")


    // this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    // this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    // this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    // this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    // this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")

    // this.conect.addStyle("layouts/semi-dark-menu/css/light/loader.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/dark/loader.css")
    // this.conect.addScriptDefer("layouts/semi-dark-menu/loader.js")
    // this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/light/plugins.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/dark/plugins.css")
    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/custom_dt_custom.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/custom_dt_custom.css")
    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    // this.conect.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js")
    // this.conect.addScriptDefer("src/bootstrap/js/bootstrap.bundle.min.js")
    // this.conect.addScriptDefer("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    // this.conect.addScriptDefer("src/plugins/src/mousetrap/mousetrap.min.js")
    // this.conect.addScriptDefer("src/plugins/src/waves/waves.min.js")
    // this.conect.addScript("layouts/semi-dark-menu/app.js")


    this.conect.addScript("src/plugins/src/global/vendors.min.js")
    this.conect.addScript("src/assets/js/custom.js")
    this.conect.addScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/jszip.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/buttons.html5.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/buttons.print.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/custom_miscellaneous.js")
}
  test(){
    console.log(this.time)
    console.log("parseDate: "+ (new Date(this.time)))
  }

  ChangeSelectedValueAll(evt:any){
    const isChecked = evt.target.checked;
    console.log(evt.target.checked); // Log the checkbox state for debugging

    const allCheckedBoxes = Array.from(document.querySelectorAll(".productchecked")) as HTMLInputElement[]

    for(let i=0; i< this.products.length; i++){
      if(allCheckedBoxes[i]){
        this.products[i].selected = isChecked
        allCheckedBoxes[i].checked = isChecked
      }
     
    } 
  }
  ChangeSelectedValue(selectedindex: number,evt:any){
    const isChecked = evt.target.checked;
      this.products[selectedindex].selected = isChecked
  }

  deleteAll(){
    // if(this.products!=''){
    //   this.cartService.deleteallItem(this.cartResult['result'][0].cartId)
    //   // window.location.href = 'user/add-to-cart'
    // }else{
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'There are no products to delete',
    //   }).then(()=>{
    //     window.location.href = 'user/home'
    //   })
    // }
  }
  DeleteItem(id:any){
    console.log(id)
    this.auctionService.rejectAuction(id).then(
      res=>{
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Delete Success',
          }).then(() =>
            window.location.href = 'admin/auction-create'
          )
        }
        
      },
      error=>{
        console.log(error)
      }
    );
    // window.location.href = 'user/add-to-cart'
  }

  addBidOrder(){
    let valid = true;
    let maxPrice:number = 0;
    const bidList:any = []
    this.products.forEach(element => {
      if(element.selected){
        bidList.push(element)
        if(maxPrice < element.price){
          maxPrice = element.price
        }
      }
    });
    const bidStart = new Date(this.bidForm.value.bidStartTime)
    const bidEnd = new Date(this.bidForm.value.bidEndTime)
    if(this.bidForm.value.incrementInPrice > (this.bidForm.value.bidSoldPrice-this.bidForm.value.bidBasePrice)){
      valid = false;
      Swal.fire({
        icon: 'error',
        title: 'bid increment must lower than base and sold price minus',
      })
    }
    if(this.bidForm.value.bidBasePrice < maxPrice || this.bidForm.value.bidSoldPrice < maxPrice){
      valid = false;
      Swal.fire({
        icon: 'error',
        title: 'bid price must higher than $' + maxPrice,
      })
    }
    if(bidStart < new Date() || bidEnd < new Date()){
      valid = false;
      Swal.fire({
              icon: 'error',
              title: 'bid date must higher than today time',
            })
    }
    if(bidStart >  bidEnd ){
      valid = false;
      Swal.fire({
              icon: 'error',
              title: 'bid ended before it start',
            })
    }
    if(valid){
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4} \d{2}:\d{2}:\d{2}$/;
      if(!dateRegex.test(this.bidForm.value.bidStartTime)){
        this.bidForm.value.bidStartTime = formatDate(this.bidForm.value.bidStartTime,'dd-MM-yyyy HH:mm:ss', 'en-GB')
      }
      if(!dateRegex.test(this.bidForm.value.bidEndTime)){
        this.bidForm.value.bidEndTime = formatDate(this.bidForm.value.bidEndTime,'dd-MM-yyyy HH:mm:ss', 'en-GB')
      }
      // const newDate = new Date(1,1,1, ...this.bidForm.value.IncrementInTime.split(':'))
      this.bidForm.value.IncrementInTime = formatDate(new Date(1,1,1, ...this.bidForm.value.IncrementInTime.split(':')),'HH:mm:ss', 'en-GB')
      const b = JSON.stringify(this.bidForm.value)
      let formData = new FormData()
      formData.append('bidinfo', JSON.stringify(this.bidForm.value))
      formData.append('bidlist', JSON.stringify(bidList))
      console.log(this.bidForm.value);
      console.log(bidList); 
      this.auctionService.addBidOrder(formData).then(
        res =>{
          Swal.fire({
            icon: 'success',
            title: 'add bid Success',
          }).then(()=>
            window.location.href = 'admin/auction-create'
          )
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
}
