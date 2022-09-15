import {BreakpointObserver} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component} from '@angular/core';
import {ModalService} from '../../core/services/modal.service';
import {LayoutStoreFacade} from '../../core/store/layout/layout-store.facade';
import {BoardsStoreFacade} from '../../pages/boards/core/store/boards-store.facade';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
})
export class NavbarMobileComponent extends NavbarComponent {
  isMenuVisible = false;

  constructor(
    boardsStoreFacade: BoardsStoreFacade,
    breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    layoutStoreFacade: LayoutStoreFacade,
    modalService: ModalService,
    ) {
    super(breakpointObserver, boardsStoreFacade, changeDetectorRef, layoutStoreFacade, modalService);
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
