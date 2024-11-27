import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],

  templateUrl: './calendar.component.html',
  host:{
    'collision': 'CalendarComponent'
  }
})
export class CalendarComponent {
  a:string
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

    // console.log(this.a)

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
    
    this.conect.addStyle("src/plugins/src/fullcalendar/fullcalendar.min.css")
    this.conect.addStyle("src/plugins/css/light/fullcalendar/custom-fullcalendar.css")
    this.conect.addStyle("src/assets/css/light/components/modal.css")
    this.conect.addStyle("src/plugins/css/dark/fullcalendar/custom-fullcalendar.css")
    this.conect.addStyle("src/assets/css/dark/components/modal.css")
    
    // this.conect.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js")

    

    this.conect.addScript("src/plugins/src/fullcalendar/fullcalendar.min.js")
    this.conect.addScript("src/plugins/src/uuid/uuid4.min.js")
    this.conect.addScript("src/plugins/src/fullcalendar/custom-fullcalendar.js")
    // this.conect.reloadPage()
  }
}
