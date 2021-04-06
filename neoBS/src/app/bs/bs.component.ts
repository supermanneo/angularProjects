import { Component, OnInit, TemplateRef, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-bs',
  templateUrl: './bs.component.html',
  styleUrls: ['./bs.component.css']
})

@Injectable()
export class BsComponent implements OnInit {
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  msgs: Array<any> = [];

  doms: any = [];
  visible = false;

  constructor(
    private http: HttpClient,

  )
  {
    this.doms.push(document.getElementById('app-container'));
  }

  ngOnInit(): void {
  }

  showToast(type: any): void {
    switch (type) {
      case 'error':
        this.msgs = [{ severity: type, content: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
        break;
      case 'common':
        this.msgs = [{ severity: type, content: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
        break;
      default:
        this.msgs = [{ severity: type, summary: '摘要', content: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
    }
  }

  getHttpReturnValue(): void{

  }


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}

export interface Config {
  heroesUrl: string;
  textFile: string;
}
