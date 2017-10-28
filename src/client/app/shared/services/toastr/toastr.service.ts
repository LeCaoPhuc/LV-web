import { Injectable, Inject } from '@angular/core';

declare var toastr: any;

@Injectable()

export class ToastrService{

    constructor(){}

    init(){}

    toast(){
        return {
            success: function(title: any, message: any){
                toastr.success(message, title);
            },
            error: function(title: any, message: any){
                toastr.error(message, title);
            },
            info: function(title: any, message: any){
                toastr.info(message, title);
            },
            warning: function(title: any, message: any){
                toastr.warning(message, title);
            }
        }
    }
}