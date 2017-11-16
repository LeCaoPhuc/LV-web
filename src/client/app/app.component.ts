import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import { ParseSDKService } from './shared/services/parse-sdk/parse-sdk.service'
/**
 * This class represents the main application component.
 */
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent  {
  constructor(private parseSDK : ParseSDKService) {
    console.log('Environment config', Config);
    parseSDK.init();
  }

  ngOnInit() {
    $(document).ready(function () {
			$('select').material_select();
		});
  }
}
