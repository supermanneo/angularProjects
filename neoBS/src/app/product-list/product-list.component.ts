import { Component } from "@angular/core";

import { products } from "../products";
import { LocalStorageService } from "../local-storage.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
  products = products;

  constructor(private localStorageService: LocalStorageService) {}

  share() {
    window.alert("The product has been shared!");
    this.localStorageService.set("shared", "mini");
  }

  onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/


// 33.95

