
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './aboutus.component.html',
  host:{
    'collision': 'AboutusComponent'
  }
})
export class AboutusComponent implements OnInit {
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive
  ){
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeStyle("src/assets/css/light/elements/custom-pagination.css")
    this.conect.removeStyle("src/assets/css/light/apps/blog-post.css")
    this.conect.removeStyle("src/assets/css/dark/elements/custom-pagination.css")
    this.conect.removeStyle("src/assets/css/dark/apps/blog-post.css")

    
    
    this.conect.addStyle("src/assets/css/light/elements/custom-pagination.css")
    this.conect.addStyle("src/assets/css/light/apps/blog-post.css")
    this.conect.addStyle("src/assets/css/dark/elements/custom-pagination.css")
    this.conect.addStyle("src/assets/css/dark/apps/blog-post.css")
    
    

    // this.conect.reloadPage()

  }
}
