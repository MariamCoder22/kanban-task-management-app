import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'sign-in', component: AuthComponent, data: {isSignUp: false}},
      {path: 'sign-up', component: AuthComponent, data: {isSignUp: true}}]),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule { }
