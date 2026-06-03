import { Component } from '@angular/core';
import { BaseTitle } from '../../shared/ui/base-title/base-title';

@Component({
  selector: 'app-home-page',
  imports: [BaseTitle],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
