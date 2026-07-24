import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  imports: [],
  templateUrl: './page-footer.html',
  styleUrl: './page-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFooter {
  currentYear: number = new Date().getFullYear();
}
