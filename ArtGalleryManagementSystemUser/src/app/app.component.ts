import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from './conect';
import { UserHeaderComponent } from './user/layouts/header/user-header.component';
import { UserFooterComponent } from './user/layouts/footer/user-footer.component';
import { SidbarComponent } from './user/layouts/sidebar/sidbar.component';
import { SignalrService } from './signalr.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/user/services/auth1.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule,UserHeaderComponent,UserFooterComponent,SidbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
      private conect : Conect,
      public signalrService: SignalrService,
      public authService: AuthService

  ){}

  ngOnInit(): void {
    this.signalrService.startConnection();

    // this.conect.addStyle("layouts/horizontal-light-menu/css/light/loader.css")
    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/loader.css")
    // this.conect.addScript("layouts/horizontal-light-menu/loader.js")
    // this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    // this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")

    
    // this.conect.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js")
    // this.conect.addScriptDefer("src/bootstrap/js/bootstrap.bundle.min.js")
    // this.conect.addScriptDefer("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    // this.conect.addScriptDefer("src/plugins/src/mousetrap/mousetrap.min.js")
    // this.conect.addScriptDefer("src/plugins/src/waves/waves.min.js")
    // this.conect.addScriptDefer("layouts/horizontal-light-menu/app.js")  
    
  }

  ngOnDestroy() {
    this.signalrService.hubConnection.off("askServerResponse");
  }
}
