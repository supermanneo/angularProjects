import { Component, EventEmitter, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";

@Component({
  selector: "app-sizer",
  templateUrl: "./sizer.component.html",
  styleUrls: ["./sizer.component.css"]
})
export class SizerComponent implements OnInit {
  @Input() size: number | String;
  @Output() sizeCHange = new EventEmitter<number>();

  fontSizePx = 17;

  constructor() {}

  ngOnInit() {}

  dec() {
    this.resize(-1);
  }

  inc() {
    this.resize(+1);
  }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeCHange.emit(this.size);
  }
}
