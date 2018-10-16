import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardImage, MatCard, MatCardModule, MatBadgeModule, MatExpansionModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInputModule, MatTabsModule, MatSelectModule, MatSortModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ShoppingItemsComponent } from './shopping-items/shopping-items.component';
import { ItemsListComponent } from './shopping-items/items-list/items-list.component';
import { ItemDetailsComponent } from './shopping-items/item-details/item-details.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetService } from './budget/budget.service';
import { BudgetEditComponent } from './budget/budget-edit/budget-edit.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { InviteesComponent } from './invitees/invitees.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HnInviteesComponent } from './invitees/hn-invitees/hn-invitees.component';
import { SgInviteesComponent } from './invitees/sg-invitees/sg-invitees.component';
import { HnInviteesService } from './invitees/hn-invitees/hn-invitees.service';
import { AuthService } from './auth/auth.service';
import { BudgetDataStorageService } from './budget/budget-data-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth-guard.service';
import { HnInviteeEditComponent } from './invitees/hn-invitees/hn-invitee-edit/hn-invitee-edit.component';
import { HnDataStorageService } from './invitees/hn-invitees/hm-data-storage.service';
import { SgDataStorageService } from './invitees/sg-invitees/sg-data-storage.service';
import { SgInviteeEditComponent } from './invitees/sg-invitees/sg-invitee-edit/sg-invitee-edit.component';
import { SgInviteesService } from './invitees/sg-invitees/sg-invitees.service';
import { InviteeService } from './invitees/invitee.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from './shopping-items/upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    ShoppingItemsComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    BudgetComponent,
    BudgetEditComponent,
    InviteesComponent,
    SigninComponent,
    SignupComponent,
    HnInviteesComponent,
    SgInviteesComponent,
    HnInviteeEditComponent,
    SgInviteeEditComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    NgbModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    BudgetService, 
    BudgetDataStorageService,
    InviteeService,
    HnInviteesService,
    HnDataStorageService,
    SgInviteesService,
    SgDataStorageService,
    UploadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
