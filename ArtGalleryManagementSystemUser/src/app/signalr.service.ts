import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


//4Tutorial
export class User {
  public id: string;
  public name: string;
  public connId: string;//signalr
  public avatar: string;
  public msgs: Array<Message>;//5Tutorial (only client-side property)
}


//5Tutorial
export class Message {
  constructor(
    public content: string,
    public mine: boolean,
    public timestamp: string  // Thêm timestamp để lưu thời gian gửi tin nhắn

  ) {}
}




@Injectable({ providedIn: 'root' })
export class SignalrService {
  userData: User; // Lưu trữ thông tin người dùng đã đăng nhập

    constructor(
        public toastr: ToastrService,
        public router: Router
    ) { 
        // Khôi phục dữ liệu người dùng từ localStorage khi ứng dụng khởi động
        const savedPersonId = localStorage.getItem("personId");
        if (savedPersonId) {
            // Tạo đối tượng `User` từ dữ liệu lưu trong localStorage
            this.userData = {
                id: savedPersonId,
                name: localStorage.getItem("userName"),  // Đảm bảo bạn lưu tên người dùng khi đăng nhập
                connId: null,
                avatar: localStorage.getItem("avatar"),
                msgs: []
            };
        }
    }


    hubConnection: signalR.HubConnection;
    //4Tutorial

    //3Tutorial
    ssSubj = new Subject<any>(); //Phát dữ liệu hoặc sự kiện đến nhiều subscriber.
    ssObs(): Observable<any> { //  Cung cấp một cách để các component hoặc service khác có thể đăng ký nhận thông tin từ Subject
        return this.ssSubj.asObservable();
    }

    startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5204/toastr', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    
      this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR connection started');
          console.log("SignalR connection state (A):", this.hubConnection.state);  // Log trạng thái sau khi kết nối
          this.ssSubj.next({ type: "HubConnStarted" });
        })
        .catch(err => {
          console.error('Error while starting connection: ' + err);
        });
    }
    
    
    stopConnection = () => {
      this.hubConnection.stop().then(() => {
        console.log('SignalR connection stopped');
      });
    }


}
