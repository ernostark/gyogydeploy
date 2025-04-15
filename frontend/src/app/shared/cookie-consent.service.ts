import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private consentKey = 'cookie-consent-accepted';
  private consentAcceptedSubject = new BehaviorSubject<boolean>(this.hasConsent());
  public consentAccepted$ = this.consentAcceptedSubject.asObservable();

  constructor() { }

  hasConsent(): boolean {
    return localStorage.getItem(this.consentKey) === 'true';
  }

  acceptConsent(): void {
    localStorage.setItem(this.consentKey, 'true');
    this.consentAcceptedSubject.next(true);
  }
}