import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatToolbarModule,
  MatChipsModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
  MatDividerModule,
  MatSidenavModule,
  MatBadgeModule,
  MatSelectModule,
  MatCardModule,
  MatMenuModule,
  MatListModule,
  MatTooltipModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PopUpAuthComponent } from './popUpAuth/popUpAuth.component';
import { LoginComponent } from 'src/app/modules/home/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/home/auth/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SnackBarComponent } from './snack-bar/snack-bar-success.component';
import { PopUpDeleteComponent } from './popUpDelete/popUp-delete.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MenuComponent } from './menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { SubTitleComponent } from './subTitle/subTitle.component';
import { InfoComponent } from './info/info.component';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PopUpAuthComponent,
    LoginComponent,
    SignupComponent,
    SnackBarComponent,
    PopUpDeleteComponent,
    MenuComponent,
    SubTitleComponent,
    InfoComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        MatBadgeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatToolbarModule,
        MatChipsModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTabsModule,
        MatDividerModule,
        MatSidenavModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatExpansionModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        DragDropModule,
        NgxAudioPlayerModule,
        TranslateModule.forRoot(),
        MatDatepickerModule,
        MatNativeDateModule
    ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatGridListModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    FooterComponent,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    HeaderComponent,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    PopUpDeleteComponent,
    MatProgressSpinnerModule,
    DragDropModule,
    NgxAudioPlayerModule,
    MenuComponent,
    SubTitleComponent,
    InfoComponent
  ],
  entryComponents: [
    PopUpAuthComponent,
    LoginComponent,
    SignupComponent,
    SnackBarComponent,
    PopUpDeleteComponent
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ]
})
export class WidgetModule {}
