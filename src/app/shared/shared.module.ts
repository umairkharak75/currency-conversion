import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyExchangerFormComponent } from './components/currency-exchanger-form/currency-exchanger-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgChartsModule } from 'ng2-charts';
import { SpinnerComponent } from './components/spinner/spinner.component';
 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [CurrencyExchangerFormComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    NgChartsModule,
    MatProgressSpinnerModule

  ],

  exports:[CurrencyExchangerFormComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    SpinnerComponent,
    NgChartsModule]
})
export class SharedModule { }
