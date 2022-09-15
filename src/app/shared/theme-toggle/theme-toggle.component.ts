import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Theme} from '../../core/enums';
import {ThemeService} from '../../core/services';
import {LayoutStoreFacade} from '../../core/store/layout/layout-store.facade';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  currentTheme$: Observable<Theme> = this.layoutStoreFacade.theme$;

  constructor(private layoutStoreFacade: LayoutStoreFacade, private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
