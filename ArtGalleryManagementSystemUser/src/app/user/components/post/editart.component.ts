
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
import { ProductWithAttributes } from '../../entities/productwithattributes.entity';
import { BaseURLService } from '../../services/baseURL.service';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule],
  
  templateUrl: './editart.component.html',
  host:{
    'collision': 'EditArtComponent'
  }
})
export class EditArtComponent implements OnInit {
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
  proId:any
  imageUrl:any
  constructor(
    private conect : Conect,
    private activatedRoute: ActivatedRoute,
    private conectActive: ConectActive,
    private formBuilder : FormBuilder,
    private userService : UserService,
    private productService:ProductService,
    private baseURLService : BaseURLService
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
  async ngOnInit(){
    this.imageUrl = this.baseURLService.IMAGE_URL

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
    this.activatedRoute.paramMap.subscribe(
      async param=>{
        this.proId = parseInt(param.get('productId'))
        // if(productIdResult!=null){
        //   this.product = productIdResult
        // }
        // console.log(productIdResult)
      }
    )
    this.product = await this.productService.findbyid(this.proId) as ProductWithAttributes
    
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
    if(this.product.image.substring(0,5)=="https"){
      this.imageArt = this.product.image
    }else{
      this.imageArt = this.imageUrl+this.product.image
    }
    
    this.descriptionText.setText(this.product.description);
    this.product.productAttributes.forEach(element => {
      if(element.type == 'Size' || element.type == 'size'){
        this.postArtForm.value.size = element.value
      }
      if(element.type == 'Paint'||element.type == 'paint'){
        this.postArtForm.value.paint = element.value
      }
      if(element.type == 'Material'||element.type == 'material'){
        this.postArtForm.value.material = element.value
      }
      if(element.type == 'Origin'||element.type == 'origin'){
        this.postArtForm.value.origin = element.value
      }
    });
    this.postArtForm = this.formBuilder.group({
      id:[this.product.id],
      sellerId: [this.product.sellerId],
      name:[this.product.name,Validators.required],
      // description:[this.descriptionText.getText()],
      price:[this.product.price,[Validators.required,Validators.pattern(/[0-9]/)]],
      quantity:[this.product.quantity,[Validators.required,Validators.pattern(/100|[1-9]\d?/)]],
      createdAt:[this.product.createdAt],
      deletedAt:[''],
      categoryId:[this.product.categoryId,Validators.required],
      size:[this.postArtForm.value.size,Validators.required],
      paint:[this.postArtForm.value.paint,Validators.required],
      material:[this.postArtForm.value.material,Validators.required],
      type:[1],
      origin:[this.postArtForm.value.origin,Validators.required]
    })
    console.log(this.product.productAttributes)
    
    console.log(this.postArtForm.value)
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
    console.log(this.selectedFile)
    let fromData = new FormData()
    fromData.append('image', this.selectedFile)
    fromData.append('productInfo',u)
    fromData.append('attributeInfo',a)
    this.productService.editart(fromData).then(
      res=>{
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Edit Árt Success',
          }).then(()=>{
            window.location.href = '/user/home'
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Edit Árt Fail',
          })
        }
      }
    )
  } 
}


