declare var google : any 
import { Component, input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../conect';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate, NgClass } from '@angular/common';
import * as JSBase64 from 'js-base64'
import { HttpClient } from '@angular/common/http';  
import Swal from 'sweetalert2'
import { UserService } from '../services/user.service';
import {  AuthService } from '../services/auth1.service';
import {  SignalrService } from '../../signalr.service';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,NgClass,ReactiveFormsModule],
  templateUrl: './login.component.html',
  host:{
    'collision': 'LoginComponent'
  }
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  wrong:string
  imageURL:string
  account:any
  typeInput:any
  forgotForm:FormGroup
  resetPassEmail:string
  isValidEmail:any
  constructor(
    private conect: Conect,
    private http : HttpClient,
    private userService: UserService,
    private formBuilder:FormBuilder,
    public authService: AuthService,
    public signalrService: SignalrService
  ){
    google.accounts.id.initialize({
      client_id:'105028155984-afc2mgb3fgmkvvo4ipcmhn1eo0070rln.apps.googleusercontent.com',
      callback:(resp : any)=> {
        this.handleLogin(resp)
      } 
    })
  }
  ngOnInit(): void {
    this.typeInput='password'
    this.username = ''
    this.password = ''
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      type: 'icon',
      shape:'circle',
      size:'large',
    })

    this.authService.authMeListenerSuccess();
    this.authService.authMeListenerFail();
    // this.conect.removeScript("src/bootstrap/js/bootstrap.bundle.min.js")
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

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    // this.conect.addStyle("src/assets/css/dark/authentication/auth-cover.css")
    // this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")

    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    // this.conect.addScriptAsync("layouts/horizontal-light-menu/alert.js")
    this.conect.reloadPage()
    
    
    this.wrong='icon-error'

    
  }
  login(){
    this.userService.findbyemail(this.username).then(
      res => {
        if (res['result']) {
          // Kiểm tra nếu tài khoản chưa bị xoá
          if (res['result'].deletedAt == null) {
            // Gọi hàm authMe với username và password
            this.authService.authMe(this.username, this.password).then(() => {
              // Gọi service để thực hiện đăng nhập sau khi authMe thành công
              this.userService.login(this.username, this.password).then(
                res => {
                  if (res['result']) {
                    // Lưu thông tin user vào sessionStorage và chuyển hướng
                    sessionStorage.setItem("loggedInUser", JSON.stringify([this.username]));
                    window.location.href = 'user/home';
                  }
                },
                () => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Login failed wrong email or password',
                  });
                }
              );
            }).catch(err => {
              // Xử lý lỗi khi authMe thất bại
              console.error('Lỗi khi xác thực qua SignalR:', err);
              Swal.fire({
                icon: 'error',
                title: 'Authentication failed',
              });
            });
          } else {
            // Tài khoản đã bị xoá
            Swal.fire({
              icon: 'error',
              title: 'Your Account Has Been Deleted',
            });
          }
        } else {
          // Tài khoản không tồn tại hoặc password không đúng
          Swal.fire({
            icon: 'error',
            title: 'Email or Password invalid',
          });
        }
      },
      // Xử lý khi không tìm thấy email
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Email or Password invalid',
        });
      }
    );
  }
  

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }

  //   this.authService.authMe(form.value.userName, form.value.password);
  //   form.reset();
  // }
  
  async downloadImage(url:string) {
  this.http.get(url, { responseType: 'blob' })
    .subscribe(blob => {
      const reader = new FileReader();
      console.log(reader)
      // this.selectFile = reader
      reader.onloadend = () => {
        this.imageURL = reader.result as string;
        console.log(this.imageURL)

      };
      reader.readAsDataURL(blob);
    });
  }
  decodeToken(token:string){
    const base64URL = token.split(".")[1]
    const base64 = base64URL.replace(/-/g,'+').replace(/_/g,'/')

    return JSON.parse(JSBase64.decode(base64))
  }
  handleLogin(resp: any) {
    const payLoad = this.decodeToken(resp.credential);
  
    this.account = {
      email: payLoad.email,
      username: payLoad.name,
      avatar: payLoad.picture,
      createdAt: formatDate(new Date(), 'dd-MM-yyyy', 'en-US'),
      role: 1
    };
  
    console.log("Dữ liệu dạng token: ", resp);
    console.log("decodeToken: ", payLoad);
  
    this.downloadImage(this.account.avatar);
  
    this.userService.findbyemail(this.account.email).then(
      res => {
        if (res['result']) {
          if (res['result'].deletedAt == null) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(this.account.email));
  
            // Gọi hàm authMe với email và null (vì không có mật khẩu khi dùng Google)
            this.authService.authMe(this.account.email, null).then(() => {
              window.location.href = 'user/home'; // Chuyển hướng sau khi xác thực thành công
            }).catch(err => {
              console.error('Lỗi khi xác thực qua SignalR:', err);
              Swal.fire({
                icon: 'error',
                title: 'Authentication failed',
              });
            });
  
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Your Account Has Been Deleted',
            });
          }
        } else {
          let s = JSON.stringify(this.account);
          let formData = new FormData();
          formData.append('avt', payLoad.picture);
          formData.append('usergg', s);
  
          this.userService.siginWithGG(formData).then(
            res => {
              if (res['result']) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(this.account.email));
  
                // Gọi authMe sau khi đăng ký thành công
                this.authService.authMe(this.account.email, null).then(() => {
                  window.location.href = 'user/home';
                }).catch(err => {
                  console.error('Lỗi khi xác thực qua SignalR:', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Authentication failed',
                  });
                });
  
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Email or Password invalid',
                });
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }
  
  show(){
    this.typeInput='text'
  }
  hide(){
    this.typeInput='password'
  }
  checkValidEmail(event:any){
    const value =  event
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    this.isValidEmail = regex.test(value)
  }
  confirmSend(){
    if(this.resetPassEmail!=null){
      this.userService.findbyemail(this.resetPassEmail).then(
        res =>{
          if(res['result']){
            if(res['result'].deletedAt==null){
              if(this.isValidEmail){
                  this.userService.sendmail(this.resetPassEmail).then(
                    () =>{
                      Swal.fire({
                        icon: 'success',
                        title: 'Send Email success',
                      })
                      this.resetPassEmail=''
                    },
                    ()=>{
                      Swal.fire({
                        icon: 'error',
                        title: 'Send Email Fail'
                      })
                      this.resetPassEmail=''
                    }
                  )
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Email invalid',
                })
              }
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Your Account Has Been Deleted',
              })
              this.resetPassEmail=''
            }
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Email invalid',
            })
            this.resetPassEmail=''
          }
        },
        ()=>{
          Swal.fire({
            icon: 'error',
            title: 'Email invalid',
          })
          this.resetPassEmail=''
        }
      )
    }
    else{
        Swal.fire({
          icon: 'error',
          title: 'Email invalid',
        })
        this.resetPassEmail=''
      }
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off("authMeResponseSuccess");
    this.signalrService.hubConnection.off("authMeResponseFail");
  }

}

