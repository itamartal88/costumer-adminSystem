

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import 'hammerjs';
@NgModule({
  imports:[MatRadioModule,MatDialogModule,MatIconModule,MatFormFieldModule,MatButtonModule,MatMenuModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule],
  exports: [MatRadioModule,MatDialogModule,MatIconModule,MatButtonModule,MatMenuModule,MatSelectModule,MatDatepickerModule]
  })

  export class MetirialModule{

  }