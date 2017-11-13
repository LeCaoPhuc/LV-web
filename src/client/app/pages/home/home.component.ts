import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, GetStringService } from '../../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  constructor(
    public HttpRequest: HttpRequestService,
    public parse: ParseSDKService,
    public getString: GetStringService
  ) { }

  ngOnInit() {
    // console.log('---------');
    this.parse.init();
    // this.parse.login('phongdo', '11111111').then((user: ParseUser) => {
    //   console.log(user);
    // }).catch((err: any) => {
    //   console.log(err);
    // })
    console.log(this.getString.get('TEST', ['Phong', 'Do']));
  }

}
