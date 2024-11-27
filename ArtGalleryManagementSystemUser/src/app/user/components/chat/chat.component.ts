import { CommonModule } from '@angular/common';
import { Message, User } from '../../../signalr.service';
import { SignalrService } from '../../../signalr.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { AuthService } from '../../services/auth1.service';
import { BaseURLService } from '../../services/baseURL.service';



@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  host: {
    'collision': 'ChatComponent'
  },
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('msgBox') msgBox: ElementRef;  // Tham chiếu đến hộp tin nhắn
  currentDateTime: string;
  users: Array<User> = new Array<User>();
  selectedUser: User;
  msg: string;
  private shouldScroll: boolean = false;  // Biến cờ để theo dõi khi cần cuộn
  private isMsgListenerRegistered: boolean = false;  // Biến cờ để kiểm soát việc đăng ký sự kiện
  imageUrl:any


  constructor(
    private conect: Conect,
    public signalrService: SignalrService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private baseURLService : BaseURLService  // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.imageUrl=this.baseURLService.IMAGE_URL
    
    
    if (!this.signalrService.hubConnection) {
      this.signalrService.startConnection();
    }

    if (this.signalrService.hubConnection.state === 1) {
      this.getOnlineUsersInv();
      this.registerSendMsgLis(); // Đảm bảo sự kiện được đăng ký
    } else {
      this.signalrService.ssSubj.subscribe((obj: any) => {
        if (obj.type === "HubConnStarted") {
          this.getOnlineUsersInv();
          this.registerSendMsgLis(); // Đăng ký sự kiện sau khi kết nối hoàn tất
        }
      });
    }

    this.authService.authMeListenerSuccess();
    this.authService.authMeListenerFail();

    const personId = localStorage.getItem("personId");
    const userName = localStorage.getItem("userName");
    const avatar = localStorage.getItem("avatar");
    const connId = localStorage.getItem("connId");
    

    if (personId && userName && connId) {
      this.signalrService.userData = {
        id: personId,
        name: userName,
        avatar: avatar,
        connId: connId,
        msgs: []
      };
    }

    this.updateCurrentDateTime();
    setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);  // Cập nhật mỗi giây

    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css");
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css");
    this.conect.addStyle("src/assets/css/light/apps/chat.css");
    this.conect.addStyle("src/assets/css/dark/apps/chat.css");

    this.conect.addScript("layouts/horizontal-light-menu/app.js");
    this.conect.addScript("src/assets/js/apps/chat.js");
    this.conect.addScriptAsync("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js");
    this.conect.addScriptAsync("src/plugins/src/glightbox/glightbox.min.js");
    this.conect.addScriptAsync("src/assets/js/apps/ecommerce-details.js");
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css");
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js");
    this.conect.reloadPage();

    console.log(this.signalrService.userData);

    this.userOnLis();
    this.userOffLis();
    this.logOutLis();
    this.getOnlineUsersLis();
  }

  trackByUserId(index: number, user: User): string {
    return user.id; // Hoặc bất kỳ thuộc tính nào đảm bảo giá trị duy nhất
  }
  
  private registerSendMsgLis(): void {
    if (!this.isMsgListenerRegistered) {  // Chỉ đăng ký sự kiện khi chưa được đăng ký
      this.signalrService.hubConnection.on("sendMsgResponse", (connId: string, msg: string) => {
        console.log("Received message from connId: ", connId);
        let receiver = this.users.find(u => u.connId === connId);
        if (receiver.msgs == null) receiver.msgs = [];
        receiver.msgs.push(new Message(msg, false, new Date().toLocaleTimeString()));
      });
      this.isMsgListenerRegistered = true;  // Đánh dấu rằng sự kiện đã được đăng ký
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    console.log("Selected user:", this.selectedUser);  // Kiểm tra giá trị của selectedUser
    this.cdr.detectChanges(); // Gọi detectChanges để cập nhật view
  }

  updateCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();  // Định dạng thời gian hiện tại
  }

  //4Tutorial
  logOut(): void {
    this.signalrService.hubConnection.invoke("logOut", this.signalrService.userData.id)
    .catch(err => console.error(err));
  }

  logOutLis(): void {
    this.signalrService.hubConnection.on("logoutResponse", () => {
      localStorage.removeItem("personId");
      location.reload();
    });
  }

  userOnLis(): void {
    this.signalrService.hubConnection.on("userOn", (newUser: User) => {
      const userExists = this.users.some(u => u.id === newUser.id);
      if (!userExists && newUser.id !== this.signalrService.userData.id) {
        this.users.push(newUser);
      }
    });
  }

  userOffLis(): void {
    this.signalrService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.id != personId);
    });
  }

  getOnlineUsersInv(): void {
    this.signalrService.hubConnection.invoke("getOnlineUsers")
    .catch(err => console.error(err));
  }

  private getOnlineUsersLis(): void {
    this.signalrService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<User>) => {
      this.users = onlineUsers.filter(user => user.id !== this.signalrService.userData.id);
    });
  }

  sendMsgInv(): void {
    if (!this.msg || this.msg.trim() === "") return;

    console.log("Sending message to:", this.selectedUser);  // Log lại người nhận
    console.log("Message content:", this.msg);  // Log nội dung tin nhắn

    const timestamp = new Date().toLocaleTimeString();

    this.signalrService.hubConnection.invoke("sendMsg", this.selectedUser.connId, this.msg)
    .catch(err => console.error(err));

    if (!this.selectedUser.msgs) this.selectedUser.msgs = [];
    this.selectedUser.msgs.push(new Message(this.msg, true, timestamp));
    this.msg = "";
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;  // Đặt lại cờ sau khi đã cuộn
    }
  }

  private scrollToBottom(): void {
    if (this.msgBox && this.msgBox.nativeElement) {
      this.msgBox.nativeElement.scrollTop = this.msgBox.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off("sendMsgResponse");  // Huỷ lắng nghe sự kiện khi component bị phá huỷ
    this.isMsgListenerRegistered = false;  // Đặt lại cờ khi huỷ sự kiện
  }

}
