import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppComponent } from './app.component';
import { environment } from './enviroment/enviroment';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, NativeDateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ManageComponent } from './manage/manage.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { SidenavDetailsComponent } from './sidenav-details/sidenav-details.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MemberRegistrationComponent,
    ManageComponent,
    HeaderNavComponent,
    SidenavDetailsComponent,
    LoginComponent,
    UpdateComponent,
    ViewDetailsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatSidenavModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }