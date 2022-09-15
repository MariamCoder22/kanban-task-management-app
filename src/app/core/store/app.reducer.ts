import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as fromLayout from './layout/layout.reducer';
import * as fromBoards from '../../pages/boards/core/store/boards.reducer';
import * as fromAuth from '../../pages/auth/core/store/auth.reducer';

export interface State {
  auth: fromAuth.State,
  layout: fromLayout.State,
  boards: fromBoards.State
}

export const reducer: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  layout: fromLayout.reducer,
  boards: fromBoards.reducer
};

export const selectAuth = (state: State) => state.auth;
export const selectLayout = (state: State) => state.layout;
export const selectBoard = (state: State) => state.boards;

// BOARD SELECTORS
export const getNumberOfBoards = createSelector(
  selectBoard,
  (state) => state.boards.length
);
export const getCurrentBoard = createSelector(
  selectBoard,
  (state) => state.boards.find(board => board.id === state.currentBoardId)
);
export const getCurrentBoardIndex = createSelector(
  selectBoard,
  (state) => state.boards.findIndex(board => board.id === state.currentBoardId)
);
export const getCurrentTasks = createSelector(
  selectBoard,
  (state) => state.tasks[state.currentBoardId!]
);
export const isLoadingBoards = createSelector(
  selectBoard,
  (state) => state.isLoadingBoards
);
export const isSavingBoard = createSelector(
  selectBoard,
  (state) => state.isSavingBoard
);
export const isSavingTask = createSelector(
  selectBoard,
  state => state.isSavingTask
);

// AUTH SELECTORS
export const authError = createSelector(
  selectAuth,
  state => state.authError
);
export const isLoggedIn = createSelector(
  selectAuth,
  state => state.isLoggedIn
);
export const isLoading = createSelector(
  selectAuth,
  state => state.isLoggingIn
)
