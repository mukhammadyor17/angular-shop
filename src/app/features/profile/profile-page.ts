import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileCard } from '../../shared/ui/profile-card/profile-card';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileCard],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private readonly authService = inject(AuthService);

  user = signal<User | null>(null);

  ngOnInit(): void {
    this.authService.getMe().subscribe((response) => {
      this.user.set(response as User);
    });
  }
}
