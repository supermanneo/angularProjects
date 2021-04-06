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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MainPageComponent } from './main-page/main-page.component';


// import { MatTabsModule } from '@angular/material/tabs';
// import { MatTableModule } from '@angular/material/table';
// import {DataTableModule, DevUIModule, PaginationModule} from 'ng-devui';
// import {I18nModule} from 'ng-devui/i18n';
import { BsComponent } from './bs/bs.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import {MatTabsModule} from '@angular/material/tabs';

registerLocaleData(zh);



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NzDrawerModule,
    NzTabsModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzTableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'products/:productId', component: ProductDetailsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'shipping', component: ShippingComponent},
      {path: 'dateformat', component: HeroBirthday2Component},
      {path: 'twoWayBinding', component: ParentComponent},
      {path: 'bs', component: BsPageComponent}
    ]),
    MatTabsModule,
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
    BsComponent,
    GlobalSettingsComponent
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
