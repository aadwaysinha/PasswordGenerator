import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    ClipboardModule
  ], 
  exports: [
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    ClipboardModule
  ]
})
export class MaterialModule { }
