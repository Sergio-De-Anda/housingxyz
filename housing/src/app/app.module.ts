import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ProviderSelectComponent } from './provider-select/provider-select.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StickyNavModule } from 'ng2-sticky-nav';
import { AddRoomComponent } from './manage-complex/add-room/add-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import {
  MatChipsModule, MatPaginatorModule, MatTableModule, MatDialogModule, MatFormFieldModule,
  MatSelectModule, MatSidenavModule, MatIconModule, MatButtonModule, MatDividerModule, MatListModule,
  MatExpansionModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { RoomUpdateFormComponent } from './room-update-form/room-update-form.component';
import { AmenityDialogueComponent } from './amenity-dialogue/amenity-dialogue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { AddComplexComponent } from './manage-complex/add-complex/add-complex.component';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { InterceptorService } from './services/interceptor.service';
import { CoordinatorModule } from './coordinator.module';
import { ComplexDetailsComponent } from './manage-complex/complex-details/complex-details.component';
import { ManageComplexComponent } from './manage-complex/manage-complex.component';
import { EditRoomComponent } from './manage-complex/edit-room/edit-room.component';
import { EditComplexComponent } from './manage-complex/edit-complex/edit-complex.component';
import { ShowRoomComponent } from './manage-complex/show-room/show-room.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProviderSelectComponent,
    AddRoomComponent,
    UpdateRoomComponent,
    ShowRoomComponent,
    RoomDetailsComponent,
    RoomUpdateFormComponent,
    AmenityDialogueComponent,
    AddComplexComponent,
    RequestDialogComponent,
    ComplexDetailsComponent,
    ManageComplexComponent,
    EditRoomComponent,
    EditComplexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CdkTableModule,
    MatDialogModule,
    StickyNavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule,
    CoordinatorModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  entryComponents: [AmenityDialogueComponent, RequestDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
