import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//pipe
import { DateTimePipe } from './date.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [DateTimePipe],
    exports: [DateTimePipe]
})

export class PipesModule { }
