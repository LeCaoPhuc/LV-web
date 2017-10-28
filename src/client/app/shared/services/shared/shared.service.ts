import {Output, EventEmitter, Injectable} from '@angular/core';
declare var $:any;

@Injectable()
export class SharedService {
    @Output() isExpandPostEvent: EventEmitter<any> = new EventEmitter();
    public status: boolean = false;
    public authenCmp: any;
    public shareData: any = {};

    constructor() {}

    showExpandPost() {
        this.status = true;
        this.isExpandPostEvent.emit(true);
    }

    hideExpandPost() {
        this.status = false;
        this.isExpandPostEvent.emit(false);
    }

    getStatusExpandPost(){
        return this.status;
    }

    checkScreenMobile(){
        window.onresize = ()=>{
            return window.innerWidth<=768;
        };
        return window.innerWidth<=768;
    }

    checkScreenSmallMobile(){
        window.onresize = ()=>{
            return window.innerWidth <= 480;
        }
        return window.innerWidth<=480
    }

    setAuthenCmp(authenCmp: any){
        this.authenCmp = authenCmp;
    }

    showAuthenModal(type: string){
        this.authenCmp.showAuthen(type);
    }

    getShareData(key: any){
      return this.shareData[key];
    }

    setShareData(key: any, val: any){
      this.shareData[key] = val;
    }

    submitWaitingToggle(target: any){
      if(target){
        $(target)[0].disabled = !$(target)[0].disabled
      }
    }
}
