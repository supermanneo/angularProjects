import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BsService {
  constructor(private http: HttpClient) {}

  getBsCurrentPrice() {
    return this.http.get("/assets/shipping.json");
  }

  getBsListViaConfig() {
    return this.http.get("/assets/bsConfig.json");
  }
}
