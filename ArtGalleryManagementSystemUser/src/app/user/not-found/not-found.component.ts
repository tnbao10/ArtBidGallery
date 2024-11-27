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
    this.conect.removeStyle("src/assets/css/light/elements/custom-pagination.css")
    this.conect.removeStyle("src/assets/css/light/apps/blog-post.css")
    this.conect.removeStyle("src/assets/css/dark/elements/custom-pagination.css")
    this.conect.removeStyle("src/assets/css/dark/apps/blog-post.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/light/loader.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/loader.css")
    this.conect.addScript("layouts/horizontal-light-menu/loader.js")

    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")

    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    this.conect.addStyle("src/assets/css/light/pages/error/error.css")

    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    // this.conect.addStyle("src/assets/css/dark/pages/error/error.css")

    this.conect.addScriptAsync('src/bootstrap/js/bootstrap.bundle.min.js')
    this.conect.reloadPage()
  }
}
