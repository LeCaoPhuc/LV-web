import { Component } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'sd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {
  public breadcrumbList: any = [];
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private parseService: ParseSDKService,
    private activatedRoute: ActivatedRoute,
  ) {
    var self = this;
    this.router.events.subscribe(function (router: any) {
      self.parseRouterUrl(router.url);
    })
  }
  ngOnInit() {
    var self = this;
    this.parseService.fetch()
      .then(function (res: any) {
        console.log(res);
        if (res && res.get('user_type') != 'admin') {
          self.router.navigate(['']);
        }
      })
      .catch(function (err: any) {
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

  parseRouterUrl(url: any) {
    var split: any = url.substr(1).split('/');
    this.breadcrumbList = [];
    for (var i in split) {
      switch (split[i]) {
        case 'dashboard':
          this.breadcrumbList.push('Tổng quan');
          break;
        case 'user':
          this.breadcrumbList.push('Người dùng');
          break;
        case 'shop':
          this.breadcrumbList.push('Cửa hàng');
          break;
        case 'product':
          this.breadcrumbList.push('Sản phẩm');
          break;
        case 'order':
          this.breadcrumbList.push('Đơn hảng');
          break;
        case 'promotion':
          this.breadcrumbList.push('Khuyến mãi');
          break;
        case 'color':
          this.breadcrumbList.push('Màu sắc');
          break;
        case 'material':
          this.breadcrumbList.push('Chất liệu');
          break;
        case 'notify':
          this.breadcrumbList.push('Thông báo');
          break;
        case 'new':
          this.breadcrumbList.push('Thêm mới');
          break;
        default:
          break
      }
    }
  }

  slideNavaToggle() {
    $('.sidenav').sidenav('open');
    // var display: any = $('.sidenav-overlay').css('display');
    // console.log(display)
    // if (display == 'none') {
    //   $('.sidenav').sidenav('open');
    // } else {
    //   $('.sidenav').sidenav('close');
    // }
  }
}
