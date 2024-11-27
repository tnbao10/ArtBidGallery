import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from '../header/user-header.component';
import { UserFooterComponent } from '../footer/user-footer.component';
import { SidbarComponent } from '../sidebar/sidbar.component';
import { Conect } from '../../../conect';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,UserHeaderComponent,UserFooterComponent,SidbarComponent],
  templateUrl: './layouts.component.html',
  host:{
    'collision': 'LayoutsComponent'
  }
})
export class LayoutsComponent {
    constructor(
      private conect : Conect,
  ){}

  ngOnInit() {

    this.conect.addStyle("layouts/horizontal-light-menu/css/light/loader.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/loader.css")
    this.conect.addScript("layouts/horizontal-light-menu/loader.js")
    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")

    
    // this.conect.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js")
    // this.conect.addScriptDefer("src/bootstrap/js/bootstrap.bundle.min.js")
    // this.conect.addScriptDefer("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    // this.conect.addScriptDefer("src/plugins/src/mousetrap/mousetrap.min.js")
    // this.conect.addScriptDefer("src/plugins/src/waves/waves.min.js")
    this.conect.addScript("layouts/horizontal-light-menu/app.js")
    
    this.conect.reloadPage()
  }

}
