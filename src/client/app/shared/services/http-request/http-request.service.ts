import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRequestService {

  constructor(private http: Http) { }

  init() {
    console.log('HttpRequest Init');
  }

  header(params: any) {
    var newHeader = new HttpHeaders();
    for (var i in params) {
      newHeader.set(i, params[i]);
    }
    return newHeader;
  }

  get(url: string, option?: any): Promise<any> {
    if (!option) option = {};
    return this.http.get(url, option)
      .map((res: Response) => { return res.json() })
      .toPromise()
  }

  post(url: string, body?: any, option?: any): Promise<any> {
    if (!body) body = {};
    if (!option) option = {};
    return this.http.post(url, body, option)
      .map((res: Response) => { return res.json() })
      .toPromise()
  }

  put(url: string, body?: any, option?: any): Promise<any> {
    if (!body) body = {};
    if (!option) option = {};
    return this.http.put(url, body, option)
      .map((res: Response) => { return res.json() })
      .toPromise()
  }

  delete(url: string, option?: any): Promise<any> {
    if (!option) option = {};
    return this.http.delete(url, option)
      .map((res: Response) => { return res.json() })
      .toPromise()
  }

}

