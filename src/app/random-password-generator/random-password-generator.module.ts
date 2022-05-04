import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RandomPasswordGeneratorService } from './random-password-generator.service';
import { RandomPasswordGeneratorComponent } from './random-password-generator/random-password-generator.component';



@NgModule({
  declarations: [
    RandomPasswordGeneratorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RandomPasswordGeneratorComponent
  ],
  providers: [
    RandomPasswordGeneratorService
  ]
})
export class RandomPasswordGeneratorModule { }
