import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public views = [
    {name: 'home', path: '/'},
    {name: 'control_flow', path: '/control_flow'},
    {name: 'long-array', path: '/long-array'},
    {name: 'lazy-forloop-rxjs', path: '/lazy-forloop-rxjs'},
    {name: 'absolute', path: '/absolute'}
  ]
}
