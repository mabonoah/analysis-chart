import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public translation: TranslationService,
    public themeService: ThemeService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  navigateToHome(): void {
    this.router.navigate(['/dashboard']);
  }
  
}
