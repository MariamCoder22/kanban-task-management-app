import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Observable, take} from 'rxjs';
import {PlaceholderDirective} from './core/directives/placeholder.directive';
import {ThemeService} from './core/services';
import {ModalService} from './core/services/modal.service';
import {LayoutStoreFacade} from './core/store/layout/layout-store.facade';
import {AuthStoreFacade} from './pages/auth/core/store/auth-store.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(PlaceholderDirective, {static: true}) placeHolder!: PlaceholderDirective;
  isCheckingAuth = false;
  isExpanded$: Observable<boolean> = this.layoutStoreFacade.isSidenavClosed$;
  isLoggedIn$: Observable<boolean> = this.authStoreFacade.isLoggedIn$;
  isMobile!: boolean;

  constructor(
    private auth: AngularFireAuth,
    private authStoreFacade: AuthStoreFacade,
    private breakpointObserver: BreakpointObserver,
    private layoutStoreFacade: LayoutStoreFacade,
    private modalService: ModalService,
    private themeService: ThemeService) {

  }
  ngOnInit() {
    this.checkIfSessionActive();
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(({matches}) => {
      this.isMobile = matches;
    });
    this.themeService.initTheme();
    this.modalService.init(this.placeHolder.viewContainerRef);
  }

  private checkIfSessionActive(): void {
    this.isCheckingAuth = true;
    this.auth.authState.pipe(take(1)).subscribe(authState => {
      this.isCheckingAuth = false;
      if (authState) {
        this.authStoreFacade.preserveSession();
      }
    });
  }
}
