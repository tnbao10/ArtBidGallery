
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { BaseURLService } from '../../services/baseURL.service';
import Swal from 'sweetalert2';
import { ConectActive } from '../../services/conectActive';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './addtocard.component.html',
  host:{
    'collision': 'AddtoCardComponent'
  }
})
export class AddtoCardComponent implements OnInit {
  cartItems: any
  buyItems: any = []
  imageUrl:any
  cartResult:any
  constructor(
    private conect : Conect,
    private userService: UserService,
    private cartService: CartService,
    private activatedRoute :ActivatedRoute,
    private conectActive:ConectActive,
    private productService:ProductService,
    private baseURLService:BaseURLService
  ){

  }
  async ngOnInit(){
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.imageUrl=this.baseURLService.IMAGE_URL
    try {
      const user = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
      this.cartResult = await this.cartService.innerCart(user['result'].id);
      if (this.cartResult['result']) {
        this.cartItems = []; // Initialize cartItems array
        for(let i=0; i<this.cartResult['result'].length; i++){
          const product = await this.productService.findProductIdWithSeller(this.cartResult['result'][i].productId);
          const checkdelete = await this.userService.findbyid(product['result'].sellerId)
          if(checkdelete['result'].deletedAt == null && product['result'].deletedAt==null){
            // if(product['result'].quantity>0){
              this.cartItems.push({
                id : product['result'].id,
                name:product['result'].name,           
                categoryId:product['result'].categoryId,
                image:product['result'].image,
                price:product['result'].price,
                quantity: this.cartResult['result'][i].quantity,
                cardid : this.cartResult['result'][i].id,
                avatar: product['result'].avatar,
                username: product['result'].username,
                selectedindex: i,
                selected:false
              });
            // }
          }
          
        }
        console.log(this.cartItems[0])
      }
      console.log(this.cartItems[0])
    } catch (error) {
      console.log(error);
    }

    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")

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
    
    this.conect.addScriptAsync("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/invoice-list.js")
  }
  formattedPrice(price: { toString: () => string; }){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  truncate(text: string, length: number, suffix: any) {
    if (text.length > length) {
      // text = text.replace(/\s+/g, '')
      return text.substring(0, length) + suffix;
    }
    return text; 
  }
  deleteAll(){
    if(this.cartItems!=''){
      this.cartService.deleteallItem(this.cartResult['result'][0].cartId).then(
        ()=>{
          Swal.fire({
            icon: 'success',
            title: 'Delete Success',
          }).then(()=>{
            window.location.href = 'user/home'
          })
        }
      )
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'There are no products to delete',
      }).then(()=>{
        window.location.href = 'user/home'
      })
    }
  }
  DeleteItem(id:any){
    console.log(id)
    this.cartService.deleteItem(id).then(
      res=>{
        Swal.fire({
          icon: 'success',
          title: 'Delete Success',
        }).then(()=>{
          window.location.href = 'user/add-to-cart'
        })
      }
    );
    // window.location.href = 'user/add-to-cart'
  }
  ChangeSelectedValueAll(evt:any){
    const isChecked = evt.target.checked;
    console.log(isChecked); // Log the checkbox state for debugging

    const deleteButtonContainer = document.querySelector('.deleteA');

    // Create the button once initially outside the conditional block:
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('dt-button', 'dt-delete', 'btn', 'btn-danger','btn-lg');
    deleteButton.setAttribute('tabindex', '0');
    deleteButton.setAttribute('aria-controls', 'invoice-list');
    deleteButton.textContent = 'Delete All';

    // Add an event listener to the button outside the conditional block:
    deleteButton.addEventListener('click', () => {
      this.deleteAll(); // Assuming this refers to a defined function
    });
    deleteButtonContainer.appendChild(deleteButton);

    // Only conditionally append or remove the button based on checkbox state:
    if (!isChecked) {
      deleteButtonContainer.removeChild(deleteButton);
      window.location.href='/user/add-to-cart'
    }

    const allCheckedBoxes = Array.from(document.querySelectorAll(".productchecked")) as HTMLInputElement[]
    for(let i=0; i< this.cartItems.length; i++){
      this.cartItems[i].selected = isChecked
      allCheckedBoxes[i].checked = isChecked
    }
  }
  ChangeSelectedValue(selectedindex: number,evt:any){
    const isChecked = evt.target.checked;
      this.cartItems[selectedindex].selected = isChecked
  }
  BuyItems(){
    this.buyItems=[]
    sessionStorage.setItem('buyItems',JSON.stringify(this.buyItems))
    console.log("Buyed")
    for(let i = 0; i < this.cartItems.length; i++){
      if(this.cartItems[i].selected){
        this.buyItems.push(this.cartItems[i]);
      }
    }
    if(this.buyItems.length >0){
      sessionStorage.setItem('buyItems', JSON.stringify(this.buyItems))
      // console.log(sessionStorage.getItem('buyItems'));
      window.location.href = '../user/invoice'
    }else{
      Swal.fire({
        icon:'info',
        title:'Please Select Árt'
      })
    }
    
  }
}
