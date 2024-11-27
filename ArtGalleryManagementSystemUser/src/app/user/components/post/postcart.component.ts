
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Quill from 'quill';
import { Product } from '../../entities/product.entity';
import { ProductAttribute } from '../../entities/productattribute';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { formatDate } from '@angular/common';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Category } from '../../entities/category.entity';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule],
  
  templateUrl: './postcart.component.html',
  host:{
    'collision': 'PostcartComponent'
  }
})
export class PostcartComponent implements OnInit {
  postArtForm:FormGroup
  postArtAttributes:any
  selectedFile:any
  imageArt:any
  descriptionText:any
  description:any = true
  // user:any
  userId:any
  attribute: any
  categories:any
  product:any
  constructor(
    private conect : Conect,
    private activatedRoute: ActivatedRoute,
    private conectActive: ConectActive,
    private formBuilder : FormBuilder,
    private userService : UserService,
    private productService:ProductService
  ){
    this.postArtForm = this.formBuilder.group({
      sellerId: [''],
      name:[''],
      description:[''],
      categoryId:[''],
      price:[''],
      quantity:[''],
      createdAt:[''],
      deletedAt:[''],
      size:[''],
      paint:[''],
      material:[''],
      type:[''],
      origin:['']
    })
  }
  ngOnInit(){
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        var user = res['result'] as User
        if(user!=null){
          this.userId = user.id
        }
    })
    this.productService.findallcategory().then(
      res=>{
        this.categories= res as Category[]
      }
    )
    // this.activatedRoute.paramMap.subscribe(
    //   async param=>{
    //     const productIdResult = await this.productService.findbyid(parseInt(param.get('productId')))
    //     if(productIdResult!=null){
    //       this.product = productIdResult as Product
    //       console.log(this.product)
    //     }
    //   }
    // )
    this.conect.removeScript('src/plugins/src/editors/quill/quill.js')
    this.conect.removeScript('src/plugins/src/tagify/tagify.min.js')
    this.conect.removeScript('src/assets/js/apps/ecommerce-create.js')
    this.conect.removeScript('src/plugins/src/autocomplete/autoComplete.min.js')
    this.conect.removeScript('src/plugins/src/autocomplete/custom-autoComplete.js')
    this.conect.removeScript('src/plugins/src/autocomplete/automaterial.min.js')
    this.conect.removeScript('src/plugins/src/autocomplete/autopaint.min.js')
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")

    this.conect.addStyle('src/assets/css/light/apps/ecommerce-create.css')
    this.conect.addStyle('src/assets/css/dark/apps/ecommerce-create.css')
    this.conect.addStyle('src/plugins/src/tagify/tagify.css')
    this.conect.addStyle('src/plugins/css/light/editors/quill/quill.snow.css')
    this.conect.addStyle('src/plugins/css/light/tagify/custom-tagify.css')
    this.conect.addStyle('src/assets/css/dark/forms/switches.css')
    this.conect.addStyle('src/plugins/css/dark/editors/quill/quill.snow.css')
    this.conect.addStyle('src/plugins/css/dark/tagify/custom-tagify.css')
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")

    
    this.conect.addScript('src/plugins/src/editors/quill/quill.js')

    this.conect.addScript('src/plugins/src/tagify/tagify.min.js')
    
    // this.conect.addScript('src/assets/js/apps/ecommerce-create.js')
    // this.conect.addScript('src/plugins/src/autocomplete/autoComplete.min.js')
    // this.conect.addScript('src/plugins/src/autocomplete/automaterial.min.js')
    // this.conect.addScript('src/plugins/src/autocomplete/autopaint.min.js')
    // this.conect.addScript('src/plugins/src/autocomplete/custom-autoComplete.js')
    
    this.conect.reloadPage()
    this.descriptionText = new Quill('#product-description', {
      modules: {
          toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
          ]
      },
      placeholder: 'Write product description...',
      theme: 'snow'  // or 'bubble'
    });
    this.postArtForm = this.formBuilder.group({
      sellerId: [''],
      name:['',Validators.required],
      // description:[this.descriptionText.getText()],
      price:['',[Validators.required,Validators.pattern(/[0-9]/)]],
      quantity:['',[Validators.required,Validators.pattern(/100|[1-9]\d?/)]],
      createdAt:[''],
      deletedAt:[''],
      categoryId:['',Validators.required],
      size:['',Validators.required],
      paint:['',Validators.required],
      material:['',Validators.required],
      type:['',Validators.required],
      origin:['',Validators.required]
    })
    
  }
  selectFile(event:any){
    this.selectedFile = event.target.files[0];
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload  = (e: any) => {
        this.imageArt = e.target.result;
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      this.imageArt = null;
    }
  }
  clickDescription(){
    if(this.descriptionText.getText()==''){
      this.description = false
    }
  }
  post(){
    this.attribute = []
    if(this.postArtForm.value.size!=''){
      this.attribute.push({
        type:'size',
        value:this.postArtForm.value.size
      })
    }
    if(this.postArtForm.value.paint!=''){
      this.attribute.push({
        type:'paint',
        value:this.postArtForm.value.paint
      })
    }
    if(this.postArtForm.value.material!=''){
      this.attribute.push({
        type:'material',
        value:this.postArtForm.value.material
      })
    }
    if(this.postArtForm.value.origin!=''){
      this.attribute.push({
        type:'origin',
        value:this.postArtForm.value.origin
      })
    }
    this.postArtForm.value.sellerId = this.userId
    this.postArtForm.value.createdAt = formatDate(new Date(),'dd-MM-yyyy','en-US')
    this.postArtForm.value.description = this.descriptionText.getText()
    let u =JSON.stringify(this.postArtForm.value)
    let a = JSON.stringify(this.attribute)
    console.log(u)
    console.log(a)
    let fromData = new FormData()
    fromData.append('image', this.selectedFile)
    fromData.append('productInfo',u)
    fromData.append('attributeInfo',a)
    this.productService.postart(fromData).then(
      res=>{
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Post Art Success',
          }).then(()=>{
            window.location.href = '/user/home'
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Post Art Fail',
          })
        }
      }
    )
  } 
}


