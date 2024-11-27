
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './contactUs.component.html',
  host:{
    'collision': 'ContactUsComponent'
  }
})
export class ContactUsComponent implements OnInit {
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive
  ){}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/plugins/src/leaflet/leaflet.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")
    
    this.conect.addStyle("src/plugins/src/leaflet/leaflet.css")
    this.conect.addStyle("src/assets/css/light/pages/contact_us.css")
    this.conect.addStyle("src/assets/css/dark/pages/contact_us.css")




    this.conect.addScriptAsync("src/plugins/src/highlight/highlight.pack.js")
    this.conect.addScriptAsync("src/plugins/src/leaflet/us-states.js")
    this.conect.addScriptAsync("src/plugins/src/leaflet/eu-countries.js")
    this.conect.addScriptAsync("src/plugins/src/leaflet/leaflet.js")
    this.conect.addScriptAsync("layouts/horizontal-light-menu/map.js")

    // this.conect.reloadPage()
  }
}
