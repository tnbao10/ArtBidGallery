import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashBoard.component.html',
  host:{
    'collision': 'DashBoardComponent'
  }
})
export class DashBoardComponent {
  constructor(
    private conect : Conect,
    private activatedRoute :ActivatedRoute,
    private conectActive : ConectActive
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/fullcalendar.min.js")
    this.conect.removeScript("src/plugins/src/uuid/uuid4.min.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/custom-fullcalendar.js")
    this.conect.removeScript("src/plugins/src/apex/apexcharts.min.js")
    this.conect.removeScript("src/assets/js/dashboard/dash_1.js")
    this.conect.removeStyle("src/plugins/src/editors/quill/quill.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-create.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImagePreview.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageCrop.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageResize.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepondPluginFileValidateSize.min.js")
    this.conect.removeScript("src/plugins/src/tagify/tagify.min.js")

    // this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    // this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    // this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    // this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    // this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")

    // this.conect.addStyle("layouts/semi-dark-menu/css/light/loader.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/dark/loader.css")
    // this.conect.addScriptDefer("layouts/semi-dark-menu/loader.js")
    // this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/light/plugins.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/dark/plugins.css")
    this.conect.addStyle("src/plugins/src/apex/apexcharts.css")
    this.conect.addStyle("src/assets/css/light/dashboard/dash_1.css")
    this.conect.addStyle("src/assets/css/dark/dashboard/dash_1.css")

    
    // this.conect.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js")
    // this.conect.addScriptDefer("src/bootstrap/js/bootstrap.bundle.min.js")
    // this.conect.addScriptDefer("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    // this.conect.addScriptDefer("src/plugins/src/mousetrap/mousetrap.min.js")
    // this.conect.addScriptDefer("src/plugins/src/waves/waves.min.js")
    // this.conect.addScript("layouts/semi-dark-menu/app.js")

    
    this.conect.addScript("src/plugins/src/apex/apexcharts.min.js")
    this.conect.addScript("src/assets/js/dashboard/dash_1.js")
    // this.conect.reloadPage()

}
}
