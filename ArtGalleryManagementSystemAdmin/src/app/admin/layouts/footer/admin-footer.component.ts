import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'user-footer',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-footer.component.html',
  host:{
    'collision': 'AdminFooterComponent'
  }
})
export class AdminFooterComponent {
  
}
