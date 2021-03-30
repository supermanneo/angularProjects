import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';

import { HttpClientModule } from '@angular/common/http';
import { ShippingComponent } from './shipping/shipping.component';
import { HeroBirthday2Component } from './hero-birthday2/hero-birthday2.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { SizerComponent } from './sizer/sizer.component';
import { ParentComponent } from './parent/parent.component';
import { HeroService } from './hero.service';
import { BsService } from './bs.service';
import { BsPageComponent } from './bs-page/bs-page.component';
import { LocalStorageService } from './local-storage.service';



import { MainPageComponent } from './main-page/main-page.component';
import { SettingsComponent } from './settings/settings.component';

// 华为 DevUI UI组件
// DevUI部分组件依赖angular动画，需要引入animations模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ng-devui/tabs';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {DataTableModule, DevUIModule, PaginationModule} from 'ng-devui';
import {I18nModule} from 'ng-devui/i18n';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    BrowserAnimationsModule,
    TabsModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'products/:productId', component: ProductDetailsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'shipping', component: ShippingComponent},
      {path: 'dateformat', component: HeroBirthday2Component},
      {path: 'twoWayBinding', component: ParentComponent},
      {path: 'bs', component: BsPageComponent}
    ]),
    BrowserAnimationsModule,
    DataTableModule,
    PaginationModule,
    I18nModule,
    DevUIModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    HeroBirthday2Component,
    ExponentialStrengthPipe,
    SizerComponent,
    ParentComponent,
    BsPageComponent,
    MainPageComponent,
    SettingsComponent
  ],
  bootstrap: [AppComponent],
  providers: [CartService, HeroService, BsService, LocalStorageService]
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
