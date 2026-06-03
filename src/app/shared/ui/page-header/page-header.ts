import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {}
