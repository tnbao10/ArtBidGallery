
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
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
  templateUrl: './resetPassword.component.html',
  host:{
    'collision': 'ResetPasswordComponent'
  }
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup
  typeInput:string = 'password'
  typeInputRe:string = 'password'
  
  constructor(
    private conect: Conect,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute : ActivatedRoute
  ){
      this.resetForm = this.formBuilder.group({
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
        
      },
      {
          validator: this.CheckP
      }
    )
  }
  ngOnInit() {
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
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.resetForm = this.formBuilder.group({
          email:[params.get('email')],
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
          resetPasswordToken:[params.get('code')],
          resetPasswordExpiry:[formatDate(new Date(),'dd-MM-yyyy HH:mm:ss','en-US')]
        },
        {
            validator: this.CheckP
        }
      )
    })
    this.conect.reloadPage()
    
    console.log(this.typeInput)
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
  resetPass(){
    
    console.log(this.resetForm.value)
    let user =  JSON.stringify(this.resetForm.value)
    let formdata = new FormData();
    formdata.append('resetinfo',user);
    this.userService.resetpass(formdata).then(
      res=>{
        if(res['result']){
          window.location.href='/login'
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Reset Password Fail',
          }).then(()=>{
            window.location.href='/'
          })
        }
      },
      ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Reset Password Fail',
        }).then(()=>{
          window.location.href='/'
        })
      }
    )
  }
}
