import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {PlaceholderDirective} from './core/directives/placeholder.directive';
import * as fromApp from './core/store/app.reducer';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AuthEffects} from './pages/auth/core/store/auth.effects';
import {BoardsEffects} from './pages/boards/core/store/boards.effects';
import {ModalModule} from './shared/modal.module';
import {SharedModule} from './shared/shared.module';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PlaceholderDirective,
    NavbarMobileComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(fromApp.reducer),
        EffectsModule.forRoot([BoardsEffects, AuthEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        SharedModule,
        ModalModule,
        FontAwesomeModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
