
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../conect';
import flatpickr from 'flatpickr';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { first } from 'rxjs';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink, ReactiveFormsModule],
  templateUrl: 'forgotPassword.component.html',
  host:{
    'collision': 'ForgotPasswordComponent'
  }
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup
  typeInput:any
  typeInputRe:any

  constructor(
    private conect: Conect,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ){
    this.forgotForm = this.formBuilder.group({
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
        password:['',
          [
            Validators.required,
            this.lengthValidator(),
            this.digitValidator(),
            this.lowercaseValidator(),
            this.uppercaseValidator(),
            this.specialCharacterValidator()
          ]
        ],
        rePassword:['',[
          Validators.required
        ]],
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
        avatar:['noimg.jpg'],
        createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-US')],
      },
      {
          validator: this.CheckP
      }
    )
  }
  ngOnInit(): void {
    this.typeInput='password'
    this.typeInputRe='password'

    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/mousetrap/mousetrap.min.js")
    this.conect.removeScript("layouts/horizontal-light-menu/app.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")

    this.conect.removeScript("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    this.conect.removeScript("src/plugins/src/waves/waves.min.js")



    this.conect.addStyle("layouts/horizontal-light-menu/css/light/loader.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/loader.css")
    this.conect.addScript("layouts/horizontal-light-menu/loader.js")
    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    this.conect.addStyle("src/assets/css/light/authentication/auth-cover.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    // this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    // this.conect.addStyle("src/assets/css/dark/authentication/auth-cover.css")

    this.conect.addStyle("src/plugins/css/light/flatpickr/custom-flatpickr.css")
    // this.conect.addStyle("src/plugins/css/dark/flatpickr/custom-flatpickr.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")

    this.conect.reloadPage()
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
  lengthValidator():ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !/.{6,20}/.test(value)) {
        return { length: true };
      }
      return null; 
    };
  }
  uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !/[A-Z]/.test(value)) {
        return { uppercase: true };
      }
      return null; 
    };
  }
  lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !/[a-z]/.test(value)) {
        return { lowercase: true };
      }
      return null;
    };
  }
  digitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !/[0-9]/.test(value)) {
        return { digit: true };
      }
      return null;
    };
  }
  specialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !/[@*#$%]/.test(value)) {
        return { specialCharacter: true };
      }
      return null;
    };
  }

  show(){
    this.typeInput='text'
  }
  hide(){
    this.typeInput='password'
  }
  showRe(){
    this.typeInputRe='text'
  }
  hideRe(){
    this.typeInputRe='password'
  }
}
