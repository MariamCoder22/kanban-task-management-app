import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Theme} from '../../../../core/enums';
import {LayoutStoreFacade} from '../../../../core/store/layout/layout-store.facade';
import {AuthStoreFacade} from '../../core/store/auth-store.facade';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authError$: Observable<string> = this.authStoreFacade.isAuthError$;
  currentTheme$: Observable<Theme> = this.layoutStoreFacade.theme$;
  form!: FormGroup;
  isLoading$: Observable<boolean> = this.authStoreFacade.isLoading$;
  isSignUp!: boolean;

  constructor(
    private authStoreFacade: AuthStoreFacade,
    private formBuilder: FormBuilder,
    private layoutStoreFacade: LayoutStoreFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({isSignUp}) => {
      this.isSignUp = isSignUp;
    });
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  ngOnDestroy() {
    this.authStoreFacade.resetErrors();
  }

  onSubmit() {
    const { email, password } = this.form.value;
    this.isSignUp
      ? this.authStoreFacade.signUp(password, email)
      : this.authStoreFacade.signIn(password, email);
  }
}
