import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Toast, ToastData, ToastType } from '../../shared/ui/toast/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  private show(message: string, type: ToastType = 'info', duration = 5000): void {
    const config: MatSnackBarConfig<ToastData> = {
      duration,
      data: { message, type },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['app-toast-panel', `app-toast-panel--${type}`],
    };

    this.snackBar.openFromComponent(Toast, config);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error', 7000);
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warning(message: string): void {
    this.show(message, 'warning', 6000);
  }
}
