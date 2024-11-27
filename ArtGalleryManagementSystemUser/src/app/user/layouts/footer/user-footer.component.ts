import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'user-footer',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-footer.component.html',
  host:{
    'collision': 'UserFooterComponent'
  }
})
export class UserFooterComponent {
  
}
