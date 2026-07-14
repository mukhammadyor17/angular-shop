import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  message: string;
  type: ToastType;
}

const TOAST_ICONS: Record<ToastType, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
  warning: 'warning',
};

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private readonly ref = inject(MatSnackBarRef<Toast>);
  readonly data = inject<ToastData>(MAT_SNACK_BAR_DATA);

  readonly icon = TOAST_ICONS[this.data.type];

  close(): void {
    this.ref.dismiss();
  }
}
