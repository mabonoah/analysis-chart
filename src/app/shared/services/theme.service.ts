import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private theme: Theme | string = Theme.light;
  get isDarkMode(): boolean {
    return this.theme === Theme.dark;
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory2: RendererFactory2
  ) {
    this.renderer = rendererFactory2.createRenderer(null, null);
    this.initializeTheme();
  }

  private get localStorageTheme(): string {
    return localStorage.getItem('theme') || '';
  }

  private set localStorageTheme(Theme: string) {
    localStorage.setItem('theme', Theme);
  }

  private initializeTheme(): void {
    if (this.localStorageTheme) this.setTheme(this.localStorageTheme);
    else {
      this.setTheme(Theme.light);
      this.setLocalStorageTheme();
    }
    this.renderer.addClass(this.document.body, this.theme);
  }

  onSwitchMode(): void {
    this.switchMode();
    this.setLocalStorageTheme();
  }

  private switchMode(): void {
    if (this.isDarkMode) {
      this.document.body.classList.replace(Theme.dark, Theme.light);
      this.setTheme(Theme.light);
    }
    else {
      this.document.body.classList.replace(Theme.light, Theme.dark);
      this.setTheme(Theme.dark);
    }
  }

  private setTheme(value: Theme | string): void {
    this.theme = value;
  }

  private setLocalStorageTheme(): void {
    this.localStorageTheme = this.theme;
  }

}
