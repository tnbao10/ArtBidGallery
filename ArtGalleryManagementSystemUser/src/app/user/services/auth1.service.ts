import { User } from '../../signalr.service';
import { SignalrService } from '../../signalr.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  // Khởi tạo service và kiểm tra trạng thái đăng nhập, thực hiện đăng nhập lại nếu cần.
    constructor(
        public signalrService: SignalrService,
        public router: Router
      ) {
          //3Tutorial
          let tempPersonId = localStorage.getItem("personId");
          if (tempPersonId) {
              if (this.signalrService.hubConnection?.state == 1) { //if already connected
                this.reauthMeListener();
                this.reauthMe(tempPersonId);
              }
              else {
                this.signalrService.ssObs().subscribe((obj: any) => {
                    if (obj.type == "HubConnStarted") {
                      this.reauthMeListener();
                      this.reauthMe(tempPersonId);
                    }
                });
              }
          }
      }

      // Kiểm tra xem người dùng có đang đăng nhập hay không
    public isAuthenticated: boolean = false;


    //Gửi thông tin đăng nhập (username, password) đến server qua SignalR.
    async authMe(person: string, pass: string) {
      let personInfo = {email: person, password: pass};
      console.log("123")

      await this.signalrService.hubConnection.invoke("authMe", personInfo)
      // .then(() => this.signalrService.toastr.info("Loging in attempt..."))
      .catch(err => console.error(err));
    }


    //xử lý khi đăng nhập thành công, lưu thông tin người dùng và điều hướng đến trang chính.
    authMeListenerSuccess() {
      this.signalrService.hubConnection.on("authMeResponseSuccess", (user: User) => {
        console.log("Login successful, user data from server:", user);  // Kiểm tra dữ liệu trả về từ server
        this.signalrService.userData = {...user};
    
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("personId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("avatar", user.avatar);
        localStorage.setItem("connId", user.connId);
        this.isAuthenticated = true;
      });
    }
    
    
    

    //Xử lý khi đăng nhập thất bại, hiển thị thông báo lỗi.
    authMeListenerFail() {
      this.signalrService.hubConnection.on("authMeResponseFail", () => {
          // this.signalrService.toastr.error("Wrong credentials!");
      });
    }


    // Gửi yêu cầu đăng nhập lại (re-authenticate) dựa trên personId đã lưu.
    async reauthMe(personId: string) {
      // Chuyển đổi personId từ chuỗi sang số nguyên kiểu int
      const numericPersonId: number = parseInt(personId, 10);  // base 10 là hệ thập phân
    
      // Gọi SignalR với personId là số nguyên
      await this.signalrService.hubConnection.invoke("reauthMe", numericPersonId)
        .catch(err => console.error(err));
    }
    




    // Xử lý khi đăng nhập lại thành công, lưu thông tin người dùng và điều hướng nếu cần.
    reauthMeListener() {
      this.signalrService.hubConnection.on("reauthMeResponse", (user: User) => {
        //4Tutorial
        console.log(user);
        this.signalrService.userData = {...user}
        this.isAuthenticated = true;
        // this.signalrService.toastr.success("Re-authenticated!");
        // if (this.signalrService.router.url == "/auth1") this.signalrService.router.navigateByUrl("/home1");
      });
    }



}
