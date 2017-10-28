import { Injectable } from '@angular/core';
import { stringData } from './string';

@Injectable()
export class GetStringService {
  constructor() { }

  init() {

  }

  get(key: any, params?: any) {
    var text = stringData[key];
    if (params) {
      return (new StringBuilder(text, params)).toString();
    } else {
      return text;
    }
  }
}

export class StringBuilder {
  private _pattern: string;
  private _params: any;
  constructor(pattern: string, params: any) {
    this._pattern = pattern;
    this._params = params;
  }

  toString() {
    var self = this;
    return this._pattern.replace(/\{(\d+)\}/g,
      function (pattern, index) {
        return self._params[index];
      });
  }
}

