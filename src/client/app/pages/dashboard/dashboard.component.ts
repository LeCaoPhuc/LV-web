import { Component } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'sd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {
  constructor(
		private router: Router,
		private sharedService: SharedService,
		private parseService: ParseSDKService
	) {

  }
  ngOnInit() {
    var self = this;
    this.parseService.fetch()
    .then(function(res: any){
      console.log(res);
      if(res && res.get('user_type') != 'admin') {
        	self.router.navigate(['']);
      }
    })
    .catch(function(err: any){
        console.log(err);
      	self.router.navigate(['']);
    })

    this.parseService.cloud('getCategoryList', { limit: 10000, page: 1 }).then(function (res: any) {
      if (res && res.data) {
        self.sharedService.setShareData('category', res.data);
      }
    }).catch(function (err: any) {
      console.log(err);
    });
  }
}
