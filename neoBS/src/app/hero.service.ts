import { Injectable } from "@angular/core";
import { HEROES } from "./heros/mock-heroes";

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: "root"
})
export class HeroService {
  constructor() {}

  getHeroes() {
    return HEROES;
  }
}
