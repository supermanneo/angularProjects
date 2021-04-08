import { Component, OnInit, TemplateRef, ViewChild, Injectable, OnDestroy } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { BsConfigDataType } from '../bs-config-data-type';

import { Config, ConfigService } from './config.service';
import {catchError} from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import {timer, Observable, Observer, Subscription} from 'rxjs';

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

  timer$: Observable<number> = timer(3000, 10000);


  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private configService: ConfigService,
    private notification: NzNotificationService,
    private message: NzMessageService
  )
  {
    this.doms.push(document.getElementById('app-container'));
  }

  ngOnInit(): void {
    const timerSub: Subscription = this.timer$.subscribe(number => {
      console.log('number', number);
      this.createBasicNotification();
      this.showGlobalMsg();
      if (number > 10) {
        timerSub.unsubscribe();
      }
    });
  }

  ngOnDestroy(){

  }

  showGlobalMsg(){
    this.message.info('This is a normal message');
  }

  createBasicNotification(): void {
    this.notification
      .blank(
        'Notification Title',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      )
      .onClick.subscribe(() => {
      console.log('notification clicked!');
    });
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
      this.getAndAssignCurrentPrice(this.currentBsConfigData[i].codeId, this.currentBsConfigData[i].codeRegion, i);
    }
  }


  // This is an sync function, all logic which need sequence should write in subscribe function
  getAndAssignCurrentPrice(codeId: string, codeRegion: string, originDataIndex: number): void{
    const bsUrl = `http://qt.gtimg.cn/q=s_${codeRegion}${codeId}`;
    const bsParams = new HttpParams();
    bsParams.set('format', 'text');
    // __ng_jsonp__.__req0.finished
    bsParams.set('callback', 'JSONP_CALLBACK');
    this.http
      .get(bsUrl, {responseType: 'text', params: bsParams })
      .subscribe(
        (data) => {
          this.currentBsConfigData[originDataIndex].currentPrice = + data.split('~')[3];
        },
        (error) => {
          console.log(error);
        });
  }

  // here should be confirm wheather the result can be format to json or text. it decided the params of format and responseType is json or text
  getServers(term: string) {
    let url = `http://qt.gtimg.cn/q=s_sz002818`;
    const nparams = new HttpParams();

    nparams.set('search', term); // the user's search value
    nparams.set('action', 'opensearch');
    nparams.set('format', 'text');
    // __ng_jsonp__.__req0.finished
    nparams.set('callback', 'JSONP_CALLBACK');
    return this.http
      //.get(url, {responseType: 'json', params: nparams })
      .get(url, {responseType: 'text', params: nparams })
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
