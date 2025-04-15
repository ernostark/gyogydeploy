import { Component, OnInit, Renderer2, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieConsentService } from '../../../shared/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  template: ``,
  standalone: true
})
export class CookieBannerComponent implements OnInit {
  private bannerElement: HTMLElement | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private cookieConsentService: CookieConsentService
  ) { }

  ngOnInit(): void {
    if (!this.cookieConsentService.hasConsent() && !document.querySelector('.cookie-banner')) {
      this.createBanner();
    }
  }

  private createBanner(): void {
    if (document.getElementById('unique-cookie-banner')) {
      return;
    }
    const styleEl = this.renderer.createElement('style');
    const css = `
      @keyframes fadeOutBanner {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(100%); }
      }
      .banner-closing {
        animation: fadeOutBanner 0.5s forwards !important;
      }
    `;
    this.renderer.appendChild(styleEl, this.renderer.createText(css));
    this.renderer.appendChild(this.document.head, styleEl);

    this.bannerElement = this.renderer.createElement('div');
    this.renderer.setAttribute(this.bannerElement, 'id', 'unique-cookie-banner');
    this.renderer.setStyle(this.bannerElement, 'position', 'fixed');
    this.renderer.setStyle(this.bannerElement, 'bottom', '0');
    this.renderer.setStyle(this.bannerElement, 'left', '0');
    this.renderer.setStyle(this.bannerElement, 'right', '0');
    this.renderer.setStyle(this.bannerElement, 'background-color', 'rgba(0, 0, 0, 0.85)');
    this.renderer.setStyle(this.bannerElement, 'color', 'white');
    this.renderer.setStyle(this.bannerElement, 'padding', '15px');
    this.renderer.setStyle(this.bannerElement, 'z-index', '10000');
    this.renderer.setStyle(this.bannerElement, 'box-shadow', '0 -2px 10px rgba(0,0,0,0.2)');
    this.renderer.setStyle(this.bannerElement, 'transition', 'opacity 0.5s ease, transform 0.5s ease');

    const container = this.renderer.createElement('div');
    this.renderer.setStyle(container, 'display', 'flex');
    this.renderer.setStyle(container, 'justify-content', 'space-between');
    this.renderer.setStyle(container, 'align-items', 'center');
    this.renderer.setStyle(container, 'max-width', '1200px');
    this.renderer.setStyle(container, 'margin', '0 auto');

    const textElement = this.renderer.createElement('p');
    const text = this.renderer.createText('Ez az oldal sütiket használ a felhasználói élmény javítása érdekében. Tájékoztatjuk, hogy ez egy oktatási célú mintaprojekt, az itt szereplő termékek és blogbejegyzések fiktívek, nem rendelhetők meg.');
    this.renderer.appendChild(textElement, text);
    this.renderer.setStyle(textElement, 'margin', '0 15px 0 0');

    const buttonsContainer = this.renderer.createElement('div');
    this.renderer.setStyle(buttonsContainer, 'display', 'flex');
    this.renderer.setStyle(buttonsContainer, 'gap', '10px');

    const acceptButton = this.renderer.createElement('button');
    this.renderer.addClass(acceptButton, 'btn');
    this.renderer.addClass(acceptButton, 'btn-primary');
    const buttonText = this.renderer.createText('Elfogadom');
    this.renderer.appendChild(acceptButton, buttonText);
    this.renderer.listen(acceptButton, 'click', () => this.acceptCookies());

    const privacyLink = this.renderer.createElement('a');
    this.renderer.setProperty(privacyLink, 'href', '/privacy-policy');
    this.renderer.addClass(privacyLink, 'btn');
    this.renderer.addClass(privacyLink, 'btn-link');
    this.renderer.setStyle(privacyLink, 'color', 'white');
    const linkText = this.renderer.createText('Adatvédelmi tájékoztató');
    this.renderer.appendChild(privacyLink, linkText);

    this.renderer.appendChild(buttonsContainer, acceptButton);
    this.renderer.appendChild(buttonsContainer, privacyLink);

    this.renderer.appendChild(container, textElement);
    this.renderer.appendChild(container, buttonsContainer);

    this.renderer.appendChild(this.bannerElement, container);

    this.renderer.appendChild(this.document.body, this.bannerElement);
  }

  private acceptCookies(): void {
    this.cookieConsentService.acceptConsent();

    if (this.bannerElement) {
      this.renderer.addClass(this.bannerElement, 'banner-closing');

      this.bannerElement.addEventListener('animationend', () => {
        if (this.bannerElement && this.bannerElement.parentNode) {
          this.bannerElement.parentNode.removeChild(this.bannerElement);
          this.bannerElement = null;
        }
      });
    }
  }
}