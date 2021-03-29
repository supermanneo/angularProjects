import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-parent",
  template: `
    <app-sizer [(size)]="fontSizePx"></app-sizer>
    <div [style.font-size.px]="fontSizePx">Resizable Text</div>
  `,
  styleUrls: ["./parent.component.css"]
})
export class ParentComponent implements OnInit {
  fontSizePx = 16;

  constructor() {}

  ngOnInit() {}
}
