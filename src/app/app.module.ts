import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon"
import { MatSidenavModule } from '@angular/material/sidenav';
import { HistoryLineComponent } from './sub_components/history-line/history-line.component';
import { LambdaTestComponent } from './sub_components/lambda-test/lambda-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryLineComponent,
    LambdaTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
