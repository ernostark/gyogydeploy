import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layout/footer/footer.component";
import { CommonModule } from '@angular/common';
import { CookieBannerComponent } from './layout/cookie/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, CommonModule, CookieBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(public router: Router) {}

  title = 'gyogynovenykereso';
}