import { Component, OnInit, TemplateRef, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { BsConfigDataType } from '../bs-config-data-type';

@Component({
  selector: 'app-bs',
  templateUrl: './bs.component.html',
  styleUrls: ['./bs.component.css']
})

@Injectable()
export class BsComponent implements OnInit {
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  msgs: Array<any> = [];
  currentBsConfigData: Array<BsConfigDataType>;
  doms: any = [];
  visible = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
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
    this.currentBsConfigData = this.localStorageService.getObject('bsConfig');
    for(let i = 0; i < this.currentBsConfigData.length; i++){
      const options = {
        responseType: 'json' as const,
        observe: 'body' as const
      };
      let url = 'http://hq.sinajs.cn/list=' + this.currentBsConfigData[i].codeRegion + this.currentBsConfigData[i].codeId;
      console.log(url);
      console.log(this.http.get(url, options));
      this.currentBsConfigData[i].currentPrice = 10.00;
    }
  }

  close(): void {
    this.visible = false;
  }

}

export interface Config {
  heroesUrl: string;
  textFile: string;
}
