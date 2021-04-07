import { Component, OnInit, TemplateRef, ViewChild, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { BsConfigDataType } from '../bs-config-data-type';

import { Config, ConfigService } from './config.service';
import {catchError} from 'rxjs/operators';




@Component({
  selector: 'app-bs',
  templateUrl: './bs.component.html',
  styleUrls: ['./bs.component.css'],
  providers: [ ConfigService ]
})

@Injectable()
export class BsComponent implements OnInit {
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  msgs: Array<any> = [];
  currentBsConfigData: Array<BsConfigDataType>;
  doms: any = [];
  visible = false;

  error: any;
  headers: string[];
  config: Config;


  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private configService: ConfigService
  )
  {
    this.doms.push(document.getElementById('app-container'));
  }

  ngOnInit(): void {
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        heroesUrl: data.heroesUrl,
        textfile:  data.textfile
      });
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

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }

  getDataByJsonp() {

    const api = 'https://hq.sinajs.cn/list=sh601111?callback=JSONP_CALLBACK';
    const api1 = 'http://qt.gtimg.cn/q=s_sz002818';

    // 这个callback部分是必输的，有些方法写的cb,此处写callback
    this.http.jsonp(api1, 'callback').subscribe(res => {

      console.log(res);

    });

  }

  callback(){

  }

  open(): void {
    this.visible = true;
    this.currentBsConfigData = this.localStorageService.getObject('bsConfig');
    for (let i = 0; i < this.currentBsConfigData.length; i++){
      // const options = {
      //   responseType: 'json' as const,
      //   observe: 'body' as const
      // };
      // let url = 'http://hq.sinajs.cn/list=' + this.currentBsConfigData[i].codeRegion + this.currentBsConfigData[i].codeId;
      //
      // this.currentBsConfigData[i].currentPrice = 10.00;
      // console.log(this.showConfig());
      // console.log(this.showConfigResponse());
    }

    // console.log(this.configService.searchHeroes('').subscribe(
    //   resp => {
    //     console.log(resp.response);
    //   }
    // ));
// The name of the callback should be the string JSON_CALLBACK.
    //this.getDataByJsonp();
    this.getServers('');
  }

  getServers(term: string) {
    let url = `http://qt.gtimg.cn/q=s_sz002818`;

    const nparams = new HttpParams();

    nparams.set('search', term); // the user's search value
    nparams.set('action', 'opensearch');
    nparams.set('format', 'json');
    nparams.set('callback', '__ng_jsonp__.__req0.finished');

    return this.http
      .get(url, {responseType: 'json', params: nparams })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        });
  }

  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }

  close(): void {
    this.visible = false;
  }

}
