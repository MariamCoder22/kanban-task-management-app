import {AfterViewInit, Component} from '@angular/core';
import {map, Observable} from 'rxjs';
import {DialogMode} from '../../../../core/enums';
import {ModalService} from '../../../../core/services/modal.service';
import {Column} from '../../core/interfaces';
import {BoardsStoreFacade} from '../../core/store/boards-store.facade';
import {AddEditBoardDialogComponent} from '../add-edit-board-dialog/add-edit-board-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements AfterViewInit {
  columns$: Observable<Column[]> = this.boardsStoreFacade.currentColumns$;
  isLoading$: Observable<boolean> = this.boardsStoreFacade.isLoadingBoards$;
  noBoards$: Observable<boolean> = this.boardsStoreFacade.boards$.pipe(map(boards => !boards.length));

  constructor(
    private boardsStoreFacade: BoardsStoreFacade,
    private modalService: ModalService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.boardsStoreFacade.loadBoards());
  }

  onAddNewColumn(): void {
    this.modalService.open(AddEditBoardDialogComponent, {mode: DialogMode.Edit});
  }

  onCreateBoard() {
    this.modalService.open(AddEditBoardDialogComponent);
  }
}
