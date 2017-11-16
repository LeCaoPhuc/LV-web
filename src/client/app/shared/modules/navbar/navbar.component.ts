import { Component,ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent { 
 constructor(
    private router: Router,
    private sharedService: SharedService,
    private parseService: ParseSDKService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
   
  }
  onClickLogOut() {
    var self = this;
    this.parseService.logout()
    .then(function(res: any){
      	self.router.navigate(['']);
    })
    .catch(function(err: any){
      self.router.navigate(['']);
      console.log(err);
    })
  }
}
