import { Injectable } from '@angular/core';
import { Config } from '../../config/env.config';
declare var $: any;
@Injectable()
export class ToolsService {
  constructor() { }

  checkEmail(string: any) {
    var regEmail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi;
    return regEmail.test(string);
  }

  replaceURLWithHTMLLinks(string: any) {
    var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
    return string.replace(urlRegex, function (url: any) {
      var urlHref = '';
      if (url.substr(0, 4) != 'http' && url.substr(0, 5) != 'https') {
        urlHref = 'http://' + url;
      } else {
        urlHref = url;
      }
      return '<a target="_blank" href="' + urlHref + '">' + url + '</a>';
    });
  }

  htmlEscape(str: string) {
    return str.replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  modalViewChildShowHideMethod(element: any, eventConfig?: any) {
    var modalOnExecute = (modal: any, eventName: any, eventFunction: any) => {
      modal.on(eventName, function (event: any) {
        eventFunction(event);
      });
    }
    var modal: any = $(element.nativeElement);
    element.show = function () {
      modal.modal('show');
    }
    element.hide = function () {
      modal.modal('hide');
    }
    if (eventConfig) {
      for (var i in eventConfig) {
        modalOnExecute(modal, i, eventConfig[i]);
      }
    }
    return element;
  }

  guid() {
    var s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (s4() + s4() + '_' + s4() + '_' + s4() + '_' + s4() + '_' + s4() + s4() + s4());
  }

  capitalize(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  convertHttpsUrl(url: any) {
    if (url) {
      url = Config.PARSE_SERVER_URL_HTTPS + '/socialobe-api' + url.split('socialobe-api')[1];
    }
    return url;
  }
  numberToFormatedString(num: any) {
    if (!num) return null;
    var str = num.toString();
    var result: string = '';
    var count = -1;
    for (let i = str.length - 1; i > -1; i--) {
      count++;
      if (count != 0 && count % 3 == 0) {
        result = '.'.concat(result);
      }
      result = str[i].concat(result);
    }
    return result;
  }
}
