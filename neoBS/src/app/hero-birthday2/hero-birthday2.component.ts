import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-hero-birthday2",
  template: `
    <p>The hero's birthday is {{ birthday | date: format | uppercase }}</p>
    <button (click)="toggleFormat()">Toggle Format</button>
    <h2>Power Booster 自定义管道接口</h2>
    <div>Normal power: <input [(ngModel)]="power" /></div>
    <div>Boost factor: <input [(ngModel)]="factor" /></div>
    <p>Super power boost: {{ power | exponentialStrength: factor }}</p>
    <button [disabled]="isUnchanged">Disabled Button</button>
    <p [ngClass]="classes">
      [ngClass] binding to the classes property making this blue
    </p>
  `,
  styleUrls: ["./hero-birthday2.component.css"]
})
export class HeroBirthday2Component implements OnInit {
  power = 5;
  factor = 1;
  isUnchanged = true;
  classes = "special";

  constructor() {}

  ngOnInit() {}

  birthday = new Date(1988, 3, 15); // April 15, 1988 -- since month parameter is zero-based
  toggle = true; // start with true == shortDate

  get format() {
    return this.toggle ? "shortDate" : "fullDate";
  }
  toggleFormat() {
    this.toggle = !this.toggle;
  }
}
