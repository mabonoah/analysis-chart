import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../enums/Lang';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  rtl: boolean = false;

  constructor(private translate: TranslateService) { }

  private get localStorageLang(): string {
    return localStorage.getItem('lang') || '';
  }

  private set localStorageLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

  setDefaultLang(defaultLang: string = Lang.en): void {
    const lang: string = this.localStorageLang ? this.localStorageLang : defaultLang;
    this.onChangeLang(lang);
  }

  switchLanguage(): void {
    if (this.translate.currentLang === Lang.ar) this.onChangeLang(Lang.en);
    else this.onChangeLang(Lang.ar);
  }

  private onChangeLang(lang: string): void {
    if (!lang) return;
    this.translate.use(lang);
    this.setDirection(lang);
    this.localStorageLang = lang;
  }

  private setDirection(lang: string) {
    if (lang === Lang.en) this.rtl = false;
    else this.rtl = true;
  }

}