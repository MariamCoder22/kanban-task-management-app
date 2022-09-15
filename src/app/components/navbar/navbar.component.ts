import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {map, Observable, startWith} from 'rxjs';
import {DialogMode, Theme} from '../../core/enums';
import {ContextMenu} from '../../core/interfaces';
import {ModalService} from '../../core/services/modal.service';
import {LayoutStoreFacade} from '../../core/store/layout/layout-store.facade';
import {
  AddEditBoardDialogComponent,
} from '../../pages/boards/components/add-edit-board-dialog/add-edit-board-dialog.component';
import {
  AddEditTaskDialogComponent,
} from '../../pages/boards/components/add-edit-task-dialog/add-edit-task-dialog.component';
import {Board} from '../../pages/boards/core/interfaces';
import {BoardsStoreFacade} from '../../pages/boards/core/store/boards-store.facade';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  contextMenu: ContextMenu[] = [
    {label: 'Edit Board', action: this.onEditBoard.bind(this)},
    {label: 'Delete Board', action: this.onDeleteBoard.bind(this), danger: true},
  ];
  currentBoard$: Observable<Board | undefined> = this.boardsStoreFacade.currentBoard$;
  currentTheme$: Observable<Theme> = this.layoutStoreFacade.theme$;
  disabled$: Observable<boolean> = this.boardsStoreFacade.currentBoard$.pipe(map(board => !board), startWith(true));
  isSidenavClosed$: Observable<boolean> = this.layoutStoreFacade.isSidenavClosed$;
  isTablet!: boolean;

  get addNewTaskLabel() {
    return this.isTablet ? '' : 'Add New Task';
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private boardsStoreFacade: BoardsStoreFacade,
    private changeDetectorRef: ChangeDetectorRef,
    private layoutStoreFacade: LayoutStoreFacade,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small]).pipe(untilDestroyed(this))
      .subscribe(({matches}) => {
      this.isTablet = matches;
      this.changeDetectorRef.detectChanges();
    });
  }

  onAddNewTask(): void {
    this.modalService.open(AddEditTaskDialogComponent);
  }

  onDeleteBoard(): void {
    this.boardsStoreFacade.deleteBoard();
  }

  onEditBoard(): void {
    this.modalService.open(AddEditBoardDialogComponent, {mode: DialogMode.Edit})
  }
}
