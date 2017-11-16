import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpRequestService } from '../../shared/index';
import { DirectiveModule } from '../../shared/directives/index';

@NgModule({
  imports: [SharedModule, CommonModule, FormsModule, DirectiveModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
