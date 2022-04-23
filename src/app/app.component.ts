import { Component, OnInit } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public translation: TranslationService) { }

  ngOnInit(): void {
    this.translation.setDefaultLang();
  }
}
