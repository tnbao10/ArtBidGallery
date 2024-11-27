
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import flatpickr from 'flatpickr';
import { UserService } from '../../services/user.service';

import { AddressService } from '../../services/address.service';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Ward } from '../../entities/ward.entity';
import Swal from 'sweetalert2';
import { BaseURLService } from '../../services/baseURL.service';
import { formatDate } from '@angular/common';
import { Address } from '../../entities/address.entity';


@Component({
  standalone: true,
  imports: [RouterOutlet,FormsModule,ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  host:{
    'collision': 'ProfileEditComponent'
  }
})
export class ProfileEditComponent implements OnInit {
  avt:any
  user:any
  birthOfDay:any
  phoneNumber:any
  lastName:any
  firstName:any
  gender:any
  editProfileForm:FormGroup
  addAddressForm:FormGroup
  editAddressForm:FormGroup
  selectedFile:File
  // addAddress:any
  allAddress:any
  provinces:any
  districts:any
  wards:any
  imageUrl:any
  @ViewChild('myPond') myPond: any;
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private userService : UserService,
    private addressSevice: AddressService,
    private formBuilder : FormBuilder,
    private baseURLService : BaseURLService

  ){
    this.editProfileForm = this.formBuilder.group({
      id:[''],
      username:['',
        [Validators.required]
      ],
      firstName:['',
        [Validators.required,
          Validators.pattern(/^[A-ZÀ-Ỹ][a-zA-Zà-ỹ\s]*/)
        ]
      ],
      lastName:['',
        [Validators.required,
          Validators.pattern(/^[A-ZÀ-Ỹ][a-zA-Zà-ỹ\s]*/)
        ]
      ],
      birthOfDate:['',
        [Validators.required,
          Validators.pattern(/\d+\-\d+\-\b(19[6-9][0-9]|200[0-6])\b/)
        ]
      ],
      email:['',
        [Validators.required,
        Validators.email]
      ],
      // password:['',
      //   [Validators.required,
      //   Validators.pattern(/^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@*#$%]).{6,20})$/)]
      // ],
      // rePassword:['',[
      //   Validators.required
      // ]],
      phoneNumber:['',
        [Validators.required,
        Validators.pattern(/^0\d{9}$/)]
      ],
      role:['',
        [Validators.required]
      ],
      gender:['',
        [Validators.required]
      ],
      avatar:[''],
      createdAt:['']
    },
    {
        validator: this.CheckP
    }
    )
    this.addAddressForm = this.formBuilder.group({
        userId:[''],
        name:[''],
        phoneNumber:[''],
        addressLine:[''],
        provinceCode:[''],
        districtCode:[''],
        wardCode:[''],
        postalCode:[''],
        createdAt:['']
    })
    this.editAddressForm = this.formBuilder.group({
      userId:[''],
      name:[''],
      phoneNumber:[''],
      addressLine:[''],
      provinceCode:[''],
      districtCode:[''],
      wardCode:[''],
      postalCode:[''],
      createdAt:['']
    })
  }
  async ngOnInit() {
    this.imageUrl = this.baseURLService.IMAGE_URL
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")

    this.conect.removeScript("src/plugins/src/leaflet/leaflet.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    this.conect.addStyle("src/assets/css/light/scrollspyNav.css");
    this.conect.addStyle("src/assets/css/light/components/carousel.css");
    this.conect.addStyle("src/assets/css/light/components/modal.css");

    this.conect.addStyle("src/assets/css/dark/scrollspyNav.css");
    this.conect.addStyle("src/assets/css/dark/components/carousel.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");


    this.conect.addStyle("src/plugins/src/notification/snackbar/snackbar.min.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/assets/css/light/components/tabs.css")
    this.conect.addStyle("src/assets/css/light/elements/alert.css")
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/light/notification/snackbar/custom-snackbar.css")
    this.conect.addStyle("src/assets/css/light/forms/switches.css")
    this.conect.addStyle("src/assets/css/light/components/list-group.css")
    this.conect.addStyle("src/assets/css/light/users/account-setting.css")

    this.conect.addStyle("src/assets/css/dark/components/tabs.css")
    this.conect.addStyle("src/assets/css/dark/elements/alert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/notification/snackbar/custom-snackbar.css")
    this.conect.addStyle("src/assets/css/dark/forms/switches.css")
    this.conect.addStyle("src/assets/css/dark/components/list-group.css")
    this.conect.addStyle("src/assets/css/dark/users/account-setting.css")


    this.conect.addScriptAsync("src/plugins/src/notification/snackbar/snackbar.min.js")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    // this.conect.addScriptAsync("src/assets/js/users/account-settings.js")
    this.conect.addStyle("src/plugins/css/light/flatpickr/custom-flatpickr.css")
    this.conect.addStyle("src/plugins/css/dark/flatpickr/custom-flatpickr.css")
    // this.conect.reloadPage()
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];

    if(this.user!=null){
      if(this.user.avatar.substring(0,5)=="https"){
        this.avt = this.user.avatar
      }else{
        this.avt = this.imageUrl+this.user.avatar
      }
      if(this.user.birthOfDate!=null){
        this.birthOfDay = this.user.birthOfDate
      }else{
        this.birthOfDay = 'Updating ......'
      }
      if(this.user.phoneNumber!=null){
        this.phoneNumber = this.user.phoneNumber
      }else{
        this.phoneNumber = 'Updating ......'
      }
      if(this.user.firstName){
        this.firstName = this.user.firstName
      }else{
        this.firstName = 'Updating ......'

      }
      if(this.user.lastName!=null){
        this.lastName = this.user.lastName
      }else{
        this.lastName = 'Updating ......'
      }
      if(this.user.gender!=null){
        this.gender = this.user.gender
      }else{
        this.gender = '3'
      }
      this.editProfileForm = this.formBuilder.group({
          id:[this.user.id],
          username:[this.user.username,
            [Validators.required]
          ],
          firstName:[this.firstName,
            [Validators.required,
              Validators.pattern(/^[A-ZÀ-Ỹ][a-zA-Zà-ỹ\s]*/)
            ]
          ],
          lastName:[this.lastName,
            [Validators.required,
              Validators.pattern(/^[A-ZÀ-Ỹ][a-zA-Zà-ỹ\s]*/)
            ]
          ],
          birthOfDate:[this.birthOfDay,
            [Validators.required,
              Validators.pattern(/\d+\-\d+\-\b(19[6-9][0-9]|200[0-6])\b/)
            ]
          ],
          email:[this.user.email,
            [Validators.required,
            Validators.email]
          ],
          // password:['',
          //   [Validators.required,
          //   Validators.pattern(/^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@*#$%]).{6,20})$/)]
          // ],
          // rePassword:['',[
          //   Validators.required
          // ]],
          phoneNumber:[this.phoneNumber,
            [Validators.required,
            Validators.pattern(/^0\d{9}$/)]
          ],
          role:[this.user.role,
            [Validators.required]
          ],
          gender:[this.gender,
            [Validators.required]
          ],
          avatar:[this.user.avatar],
          createdAt:[this.user.createdAt]
        },
        {
            validator: this.CheckP
        }
      )
      this.addAddressForm = this.formBuilder.group({
        userId:[this.user.id],
        name:['',[
          Validators.required
        ]],
        phoneNumber:['',
          [Validators.required,
          Validators.pattern(/^0\d{9}$/)]
        ],
        addressLine:['',[
          Validators.required
        ]],
        provinceCode:['',[
          Validators.required
        ]],
        districtCode:['',[
          Validators.required
        ]],
        wardCode:['',[
          Validators.required
        ]],
        postalCode:['',[
          Validators.required
        ]],
        createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-US')]
      })
      
      this.addressSevice.findalladdress(this.user.id).then(
        res=>{
          this.allAddress = res['result'] as Address[]
        }
      )
      console.log(this.allAddress)
    }
    const addAddressResult = await this.addressSevice.findallprovince()
    this.provinces = addAddressResult['result'] as Province[]
    flatpickr('#rangeCalendarFlatpickr', {
      mode: 'single',
      dateFormat:'d-m-Y',
    });
  }
  ngAfterViewInit(): void {
    // Khởi tạo flatpickr
    flatpickr('#rangeCalendarFlatpickr', {
      mode: 'single',
      dateFormat:'d-m-Y',
    });
  }
  CheckP(control:AbstractControl){
    return control.value.password === control.value.rePassword ? null:{mismatch:true}
  }
  selectFile(event:any){
    this.selectedFile = event.target.files[0];
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload  = (e: any) => {
        this.avt = e.target.result;
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      this.avt = null;
    }
  }
  editProfile(){
    let u =JSON.stringify(this.editProfileForm.value)
    console.log(u)
    let fromData = new FormData()
    fromData.append('avatar', this.selectedFile)
    fromData.append('profile',u)
    this.userService.editprofile(fromData).then(
      res=>{
          if(res['result']){
            window.location.href = '/user/edit-profile'
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Edit Profile Fail',
            })
          }
      },
      ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Edit Profile Fail',
        })
      }
    )
    console.log(this.selectedFile)
  }
  async choosedProvince(event:any){
    console.log(this.provinces)
    if(event.target.value!=''|| this.provinces!=null){
      const addAddressResult = await this.addressSevice.finddistrictbyprovincecode(event.target.value)
      this.districts = addAddressResult['result'] as District[]
    }
    else{
      this.districts = []
      this.wards = []
    }
  }
  async choosedDistrict(event:any){
    if(event.target.value!=''|| this.districts!=null){
      const addAddressResult = await this.addressSevice.findwardbydistrictcode(event.target.value)
      this.wards = addAddressResult['result'] as Ward[]
    }
    else{
      this.wards = []
    }
  }
  createAddress(){
    let a =JSON.stringify(this.addAddressForm.value)
    console.log(a)
    let fromData = new FormData()
    fromData.append('addressInfor',a)
    this.addressSevice.addaddress(fromData).then(
      res=>{
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Add Address Success',
          }).then(()=>{
            window.location.href = 'user/edit-profile'
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Add Address Fail',
          })
        }
      },
      ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Add Address Fail',
        })
      }
    )
  }
  editAddress(addressId:number){
    console.log(addressId)
    
     this.addressSevice.findaddressbyid(addressId).then(
      async res=>{
        const address = res['result'] as Address
        console.log(address)
        if(this.provinces != null){
          const addAddressResult = await this.addressSevice.finddistrictbyprovincecode(address.provinceCode)
          this.districts = addAddressResult['result'] as District[]
          if(this.districts!=null){
            const addAddressResult = await this.addressSevice.findwardbydistrictcode(address.districtCode)
            this.wards = addAddressResult['result'] as Ward[]
          }
        }
        this.editAddressForm = this.formBuilder.group({
          id:[addressId],
          userId:[this.user.id],
          name:[address.name],
          phoneNumber:[address.phoneNumber],
          addressLine:[address.addressLine],
          provinceCode:[address.provinceCode],
          districtCode:[address.districtCode],
          wardCode:[address.wardCode],
          postalCode:[address.postalCode],
          createdAt:[address.createdAt]
        })
      }
    )
  }
  editSave(){
    let a =JSON.stringify(this.editAddressForm.value)
    console.log(a)
    let fromData = new FormData()
    fromData.append('addressProfile',a)
    this.addressSevice.editaddress(fromData).then(
      res=>{
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Edit Address Success',
          }).then(()=>{
            window.location.href = 'user/edit-profile'
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Add Address Fail',
          })
        }
      },
      ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Add Address Fail',
        })
      }
    )

  }
}
