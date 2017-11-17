import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService } from '../../../../shared/index';
import { DirectiveModule } from '../../../../shared/directives/index';
@NgModule({
  imports: [SharedModule, CommonModule,FormsModule,DirectiveModule],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent]
})
export class UserDetailsModule { }
