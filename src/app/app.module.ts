import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CurrencyConversionService } from './services/currency-conversion.service';
import { HeaderComponent } from './layout/header/header.component';

import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';
import { RouterModule, Routes } from '@angular/router';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HttpCallInterceptor } from './core/http.interceptor';
import { HttpService } from './services/http.service';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'detail/:id',
        component: CurrencyDetailComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyDetailComponent,
    ContentLayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MatIconModule,

    RouterModule.forRoot(routes),
  ],
  providers: [
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCallInterceptor, multi: true },
    CurrencyConversionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
