import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { AdminHeaderComponent } from '../header/admin-header.component';
import { AdminSidbarComponent } from '../sidebar/admin-sidbar.component';
import { AdminFooterComponent } from '../footer/admin-footer.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,AdminHeaderComponent,AdminSidbarComponent,AdminFooterComponent],
  templateUrl: './admin.component.html',
  host:{
    'collision': 'AdminComponent'
  }
})
export class AdminComponent {
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    
    // this.calendarC.newVariableEvent.subscribe(s=>this.actives=s)
    // this.actives = 'active'
    // console.log(this.actives)
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/fullcalendar.min.js")
    this.conect.removeScript("src/plugins/src/uuid/uuid4.min.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/custom-fullcalendar.js")
    this.conect.removeScript("src/plugins/src/apex/apexcharts.min.js")
    this.conect.removeScript("src/assets/js/dashboard/dash_1.js")
  
    this.conect.addStyle("layouts/semi-dark-menu/css/light/loader.css")
    this.conect.addStyle("layouts/semi-dark-menu/css/dark/loader.css")
    this.conect.addScriptDefer("layouts/semi-dark-menu/loader.js")
    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    this.conect.addStyle("layouts/semi-dark-menu/css/light/plugins.css")
    this.conect.addStyle("layouts/semi-dark-menu/css/dark/plugins.css")


    // this.conect.addScript("src/bootstrap/js/bootstrap.bundle.min.js")
    // this.conect.addScript("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    // this.conect.addScript("src/plugins/src/mousetrap/mousetrap.min.js")
    // this.conect.addScript("layouts/semi-dark-menu/addActives.js")
    // this.conect.addScript("src/plugins/src/waves/waves.min.js")
    this.conect.addScript("layouts/semi-dark-menu/app.js")
    this.conect.reloadPage()

    // this.conect.addScript("src/plugins/src/apex/apexcharts.min.js")
    // this.conect.addScript("src/assets/js/dashboard/dash_1.js")
    
}
}
