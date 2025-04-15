import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RelatedContentService } from './shared/services/related-content-service.service';
import { CookieBannerComponent } from './layout/cookie/cookie-banner/cookie-banner.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    RelatedContentService,
    CookieBannerComponent
  ],
};

bootstrapApplication(AppComponent, appConfig);
