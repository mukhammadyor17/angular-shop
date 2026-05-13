import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeader } from '../../general/page-header/page-header';
import { PageFooter } from '../../general/page-footer/page-footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, PageHeader, PageFooter],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
