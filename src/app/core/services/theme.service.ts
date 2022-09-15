import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Theme} from '../enums';
import {DarkTheme, LightTheme} from '../themes';
import {StorageService} from './storage.service';
import * as fromApp from '../store/app.reducer';
import * as layoutActions from '../store/layout/layout.actions';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme: Theme = Theme.Light;
  private storageKey = 'favoriteTheme';

  constructor(
    private storageService: StorageService,
    private store: Store<fromApp.State>) {
  }

  initTheme(): void {
      this.loadFavoriteTheme();
      this.applyTheme();
  }

  loadFavoriteTheme(): void {
    const favoriteTheme = this.storageService.get(this.storageKey) as Theme;
    if (favoriteTheme) {
      this.activeTheme = favoriteTheme;
    }
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.applyTheme();
    this.saveFavoriteTheme();
  }

  private applyTheme(): void {
    this.store.dispatch(layoutActions.setTheme({theme: this.activeTheme}));
    const root = document.documentElement;
    const currentTheme = this.activeTheme === Theme.Light ? LightTheme : DarkTheme;
    Object.keys(currentTheme).forEach(key => {
      root.style.setProperty(key, currentTheme[key]);
    });
  }

  private saveFavoriteTheme(): void {
    this.storageService.set(this.storageKey, this.activeTheme);
  }
}
