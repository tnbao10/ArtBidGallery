import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { asyncScheduler, interval, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { Conect } from '../../conect';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'not-found.component.html',
  // styleUrls: ['./not-found.component.css'],
  host:{
    'collision': 'NotFoundComponent'
  }
})
export class NotFoundComponent implements OnInit{
  constructor(
    private conect : Conect
  ){}

  ngOnInit(): void {
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/mousetrap/mousetrap.min.js")
    this.conect.removeScript("layouts/semi-dark-menu/app.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    this.conect.removeScript("src/plugins/src/waves/waves.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")


    this.conect.addStyle("layouts/semi-dark-menu/css/light/loader.css")
    this.conect.addStyle("layouts/semi-dark-menu/css/dark/loader.css")
    this.conect.addScript("layouts/semi-dark-menu/loader.js")
    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")

    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")

    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    this.conect.addStyle("src/assets/css/light/pages/error/error.css")

    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    // this.conect.addStyle("src/assets/css/dark/pages/error/error.css")

    this.conect.addScriptAsync('src/bootstrap/js/bootstrap.bundle.min.js')
    this.conect.reloadPage()
  }
}
