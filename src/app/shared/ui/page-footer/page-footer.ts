import { Component } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  imports: [],
  templateUrl: './page-footer.html',
  styleUrl: './page-footer.scss',
})
export class PageFooter {
  currentYear: number = new Date().getFullYear();
}
